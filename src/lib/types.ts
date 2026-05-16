export type Region = "eu-central" | "eu-west" | "cz";

export type ProviderId = "aws" | "hetzner" | "masterdc" | "wedos";

export type ScenarioId = "static" | "wordpress" | "api" | "high-traffic";

export type Currency = "USD" | "EUR" | "CZK";

export interface Money {
  amount: number;
  currency: Currency;
}

export interface PriceSource {
  /** Public URL where the price was sourced. */
  url: string;
  /** ISO date (YYYY-MM-DD) when this row was last refreshed. */
  fetchedAt: string;
}

/** A concrete SKU offered by a provider — the unit a real customer buys. */
export interface ProviderPackage {
  /** Stable id used by the fetcher and across the calculator. */
  id: string;
  /** Display name (e.g. "CCX13", "EC2 t3.small"). */
  name: string;
  vcpu: number;
  ramGB: number;
  /** Storage bundled with the package (GB). */
  includedStorageGB: number;
  /** Egress traffic included per month (GB). */
  includedTransferGB: number;
  price: Money;
  source: PriceSource;
}

export interface OverageRates {
  /** Per GB / month above what the package includes. */
  extraStorageGB?: Money;
  /** Per GB of egress above what the package includes. */
  extraTransferGB?: Money;
  /** Per GB of CDN delivery. Omit if the provider has no native CDN. */
  cdnGB?: Money;
}

export interface ManagedDatabase {
  /** Display name of the assumed DB tier (e.g. "RDS db.t3.micro"). */
  name: string;
  /** Fixed monthly fee for the DB instance. */
  baseFee: Money;
  /** Per GB / month of DB storage. */
  perGB: Money;
  source: PriceSource;
}

export interface Provider {
  id: ProviderId;
  name: string;
  shortName: string;
  region: Region;
  logo: string | null;
  url: string;
  packages: ProviderPackage[];
  overage: OverageRates;
  /** Present only for providers that bill managed DB separately (e.g. AWS RDS). */
  managedDb?: ManagedDatabase;
  hiddenCosts: string[];
  strengths: string[];
  weaknesses: string[];
  bestFor: ScenarioId[];
}

export interface Scenario {
  id: ScenarioId;
  name: string;
  description: string;
  emoji: string;
  defaults: CalculatorInput;
}

export interface CalculatorInput {
  monthlyVisitors: number;
  databaseGB: number;
  storageGB: number;
  transferTB: number;
  needsCDN: boolean;
  needsDatabase: boolean;
}

export interface CalculationBreakdown {
  /** Cost of the chosen base package, in CZK. */
  package: number;
  /** Cost of storage above what the package includes, in CZK. */
  extraStorage: number;
  /** Cost of egress above what the package includes, in CZK. */
  extraTransfer: number;
  /** Cost of managed DB (instance + DB storage), in CZK. Zero if DB shares the VPS. */
  managedDb: number;
  /** Cost of CDN delivery, in CZK. Zero if provider has no native CDN. */
  cdn: number;
}

export interface CalculationResult {
  provider: Provider;
  /** The package the calculator picked (or null if nothing fits). */
  chosenPackage: ProviderPackage | null;
  monthlyPriceCZK: number;
  yearlyPriceCZK: number;
  breakdown: CalculationBreakdown;
  warnings: string[];
  /** Estimated capacity required for the scenario. */
  estimatedVcpu: number;
  estimatedRamGB: number;
  /** True when no package fits the requested vCPU / RAM. */
  insufficientCapacity: boolean;
}

export interface ExchangeRate {
  USD_CZK: number;
  EUR_CZK: number;
}

export interface ProvidersDataFile {
  lastUpdated: string;
  exchangeRate: ExchangeRate;
  providers: Provider[];
  scenarios: Scenario[];
}
