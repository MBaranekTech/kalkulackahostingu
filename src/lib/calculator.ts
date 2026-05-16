import type {
  CalculationResult,
  CalculatorInput,
  ExchangeRate,
  Money,
  Provider,
  ProviderPackage,
} from "./types";

export function estimateVcpu(monthlyVisitors: number): number {
  if (monthlyVisitors < 10_000) return 1;
  if (monthlyVisitors < 50_000) return 2;
  if (monthlyVisitors < 200_000) return 4;
  if (monthlyVisitors < 1_000_000) return 8;
  return 16;
}

export function estimateRam(
  monthlyVisitors: number,
  needsDatabase: boolean,
): number {
  let base: number;
  if (monthlyVisitors < 10_000) base = 1;
  else if (monthlyVisitors < 50_000) base = 2;
  else if (monthlyVisitors < 200_000) base = 4;
  else if (monthlyVisitors < 1_000_000) base = 8;
  else base = 16;

  if (needsDatabase) base += 2;
  return base;
}

export function toCZK(money: Money, rates: ExchangeRate): number {
  switch (money.currency) {
    case "CZK":
      return money.amount;
    case "USD":
      return money.amount * rates.USD_CZK;
    case "EUR":
      return money.amount * rates.EUR_CZK;
  }
}

/**
 * Pick the cheapest package whose specs meet the requested vCPU and RAM.
 * If nothing fits, fall back to the largest package available (the caller
 * marks the result as undersized so the UI can warn).
 */
export function pickPackage(
  neededVcpu: number,
  neededRamGB: number,
  provider: Provider,
  rates: ExchangeRate,
): { pkg: ProviderPackage | null; insufficient: boolean } {
  const fitting = provider.packages.filter(
    (p) => p.vcpu >= neededVcpu && p.ramGB >= neededRamGB,
  );

  if (fitting.length > 0) {
    const cheapest = fitting.reduce((best, p) =>
      toCZK(p.price, rates) < toCZK(best.price, rates) ? p : best,
    );
    return { pkg: cheapest, insufficient: false };
  }

  // Nothing fits — return the largest package (by vCPU then RAM) so we can
  // still surface an estimate with a clear warning.
  if (provider.packages.length === 0) {
    return { pkg: null, insufficient: true };
  }
  const largest = provider.packages.reduce((best, p) =>
    p.vcpu > best.vcpu || (p.vcpu === best.vcpu && p.ramGB > best.ramGB)
      ? p
      : best,
  );
  return { pkg: largest, insufficient: true };
}

export function calculate(
  input: CalculatorInput,
  provider: Provider,
  rates: ExchangeRate,
): CalculationResult {
  const vcpu = estimateVcpu(input.monthlyVisitors);
  const ram = estimateRam(input.monthlyVisitors, input.needsDatabase);
  const { pkg, insufficient } = pickPackage(vcpu, ram, provider, rates);

  // Package
  const packageCZK = pkg ? toCZK(pkg.price, rates) : 0;

  // Storage that lands on the VPS disk: requested storage plus DB storage when
  // the provider doesn't have a separately-billed managed DB.
  const usesManagedDb = input.needsDatabase && !!provider.managedDb;
  const vpsStorageNeeded =
    input.storageGB +
    (input.needsDatabase && !usesManagedDb ? input.databaseGB : 0);

  const extraStorageGB = pkg
    ? Math.max(0, vpsStorageNeeded - pkg.includedStorageGB)
    : vpsStorageNeeded;
  const extraStorageCZK =
    extraStorageGB > 0 && provider.overage.extraStorageGB
      ? extraStorageGB * toCZK(provider.overage.extraStorageGB, rates)
      : 0;

  // Egress transfer above the package allowance.
  const transferGB = input.transferTB * 1024;
  const extraTransferGB = pkg
    ? Math.max(0, transferGB - pkg.includedTransferGB)
    : transferGB;
  const extraTransferCZK =
    extraTransferGB > 0 && provider.overage.extraTransferGB
      ? extraTransferGB * toCZK(provider.overage.extraTransferGB, rates)
      : 0;

  // Managed DB instance + storage (e.g. AWS RDS).
  const managedDbCZK =
    usesManagedDb && provider.managedDb
      ? toCZK(provider.managedDb.baseFee, rates) +
        input.databaseGB * toCZK(provider.managedDb.perGB, rates)
      : 0;

  // CDN: assume half of egress flows through the CDN when the user opts in.
  const cdnCZK =
    input.needsCDN && provider.overage.cdnGB
      ? transferGB * 0.5 * toCZK(provider.overage.cdnGB, rates)
      : 0;

  const monthly =
    packageCZK + extraStorageCZK + extraTransferCZK + managedDbCZK + cdnCZK;

  return {
    provider,
    chosenPackage: pkg,
    monthlyPriceCZK: Math.round(monthly),
    yearlyPriceCZK: Math.round(monthly * 12),
    breakdown: {
      package: Math.round(packageCZK),
      extraStorage: Math.round(extraStorageCZK),
      extraTransfer: Math.round(extraTransferCZK),
      managedDb: Math.round(managedDbCZK),
      cdn: Math.round(cdnCZK),
    },
    warnings: provider.hiddenCosts,
    estimatedVcpu: vcpu,
    estimatedRamGB: ram,
    insufficientCapacity: insufficient,
  };
}

export function calculateAll(
  input: CalculatorInput,
  providers: Provider[],
  rates: ExchangeRate,
): CalculationResult[] {
  return providers
    .map((p) => calculate(input, p, rates))
    .sort((a, b) => a.monthlyPriceCZK - b.monthlyPriceCZK);
}

export function formatCZK(value: number): string {
  return new Intl.NumberFormat("cs-CZ", {
    style: "currency",
    currency: "CZK",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatVisitors(value: number): string {
  return new Intl.NumberFormat("cs-CZ").format(value);
}
