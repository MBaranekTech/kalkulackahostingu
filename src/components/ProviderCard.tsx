"use client";

import { useState } from "react";
import type { CalculationResult } from "@/lib/types";
import { formatCZK } from "@/lib/calculator";
import { Card } from "./ui/Card";
import { Chip } from "./ui/Chip";

interface Props {
  result: CalculationResult;
  rank: number;
  isCheapest: boolean;
  priceRatio: number;
}

const ROW_LABELS: Record<keyof CalculationResult["breakdown"], string> = {
  package: "Základní balíček",
  extraStorage: "Storage navíc",
  extraTransfer: "Data transfer navíc",
  managedDb: "Managed databáze",
  cdn: "CDN",
};

export function ProviderCard({ result, rank, isCheapest, priceRatio }: Props) {
  const [expanded, setExpanded] = useState(isCheapest);
  const {
    provider,
    chosenPackage,
    monthlyPriceCZK,
    yearlyPriceCZK,
    breakdown,
    insufficientCapacity,
  } = result;

  const breakdownEntries = (
    Object.keys(breakdown) as Array<keyof typeof breakdown>
  ).filter((k) => breakdown[k] > 0);

  // Build "2 vCPU · 8 GB · 80 GB SSD · 20 TB transfer" line from the SKU.
  const packageSpec = chosenPackage
    ? [
        `${chosenPackage.vcpu} vCPU`,
        `${chosenPackage.ramGB} GB RAM`,
        chosenPackage.includedStorageGB > 0
          ? `${chosenPackage.includedStorageGB} GB SSD`
          : null,
        chosenPackage.includedTransferGB >= 999999
          ? "neomezený transfer"
          : chosenPackage.includedTransferGB >= 1024
            ? `${Math.round(chosenPackage.includedTransferGB / 1024)} TB transfer`
            : `${chosenPackage.includedTransferGB} GB transfer`,
      ]
        .filter(Boolean)
        .join(" · ")
    : null;

  return (
    <Card
      variant={isCheapest ? "elevated" : "filled"}
      elevation={isCheapest ? 2 : 0}
      className={`overflow-hidden ${
        isCheapest
          ? "ring-2 ring-success/60 ring-offset-2 ring-offset-background"
          : ""
      }`}
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-label-md text-on-surface-variant tabular-nums">
                #{rank}
              </span>
              <h3 className="text-title-lg text-on-surface">{provider.name}</h3>
            </div>
            {chosenPackage && (
              <div className="mt-1 text-body-md text-on-surface-variant">
                <span className="font-mono text-on-surface">
                  {chosenPackage.name}
                </span>
                {packageSpec && <span className="mx-2 opacity-60">·</span>}
                {packageSpec}
              </div>
            )}
            <div className="mt-2 flex flex-wrap gap-1.5">
              {isCheapest && <Chip tone="success">🏆 Nejvýhodnější</Chip>}
              {provider.region === "cz" && <Chip tone="primary">🇨🇿 Data v ČR</Chip>}
              {insufficientCapacity && (
                <Chip tone="error">⚠ Provider nemá dost velký balíček</Chip>
              )}
              {!isCheapest && priceRatio >= 3 && (
                <Chip tone="error">{priceRatio.toFixed(1)}× dražší</Chip>
              )}
              {!isCheapest && priceRatio < 3 && priceRatio >= 1.5 && (
                <Chip tone="warning">{priceRatio.toFixed(1)}× dražší</Chip>
              )}
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-headline-md font-semibold text-on-surface tabular-nums">
              {formatCZK(monthlyPriceCZK)}
            </div>
            <div className="text-label-md text-on-surface-variant">
              za měsíc
            </div>
            <div className="text-label-md text-on-surface-variant mt-1 tabular-nums">
              {formatCZK(yearlyPriceCZK)} / rok
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-4 w-full text-left text-label-lg text-primary flex items-center justify-between md-state-layer rounded-md py-1.5 px-2 -mx-2"
          aria-expanded={expanded}
        >
          <span>{expanded ? "Skrýt rozpad" : "Zobrazit rozpad"}</span>
          <span
            className="transition-transform duration-200"
            style={{ transform: expanded ? "rotate(180deg)" : "rotate(0)" }}
            aria-hidden
          >
            ▾
          </span>
        </button>

        <div
          className={`grid transition-all duration-300 ease-out ${
            expanded ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <dl className="divide-y divide-outline-variant">
              {breakdownEntries.map((key) => (
                <div
                  key={key}
                  className="flex justify-between py-2 text-body-md"
                >
                  <dt className="text-on-surface-variant">{ROW_LABELS[key]}</dt>
                  <dd className="font-mono tabular-nums text-on-surface">
                    {formatCZK(breakdown[key])}
                  </dd>
                </div>
              ))}
              <div className="flex justify-between py-2 text-body-md text-on-surface-variant italic">
                <dt>Odhad potřeby</dt>
                <dd>
                  {result.estimatedVcpu} vCPU · {result.estimatedRamGB} GB RAM
                </dd>
              </div>
              {chosenPackage && (
                <div className="flex justify-between py-2 text-body-md text-on-surface-variant italic">
                  <dt>Zdroj ceny</dt>
                  <dd>
                    <a
                      href={chosenPackage.source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline break-all"
                    >
                      {new URL(chosenPackage.source.url).hostname}
                    </a>
                    <span className="ml-2 font-mono text-label-md">
                      ({chosenPackage.source.fetchedAt})
                    </span>
                  </dd>
                </div>
              )}
            </dl>

            {provider.strengths.length > 0 && (
              <div className="mt-4 grid sm:grid-cols-2 gap-3">
                <section>
                  <h4 className="text-label-lg text-on-surface-variant mb-1">
                    Plusy
                  </h4>
                  <ul className="space-y-1 text-body-md text-on-surface">
                    {provider.strengths.map((s) => (
                      <li key={s} className="flex gap-2">
                        <span aria-hidden className="text-success">✓</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </section>
                <section>
                  <h4 className="text-label-lg text-on-surface-variant mb-1">
                    Mínusy
                  </h4>
                  <ul className="space-y-1 text-body-md text-on-surface">
                    {provider.weaknesses.map((w) => (
                      <li key={w} className="flex gap-2">
                        <span aria-hidden className="text-error">✕</span>
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
              <a
                href={provider.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-label-lg text-primary hover:underline"
              >
                Web {provider.shortName}
                <span aria-hidden>↗</span>
              </a>
              {(() => {
                // Deep-link AWS packages to instances.vantage.sh for deeper
                // specs (CPU benchmarks, network performance, Reserved/Spot
                // pricing) the calculator deliberately doesn't reproduce.
                if (provider.id !== "aws" || !chosenPackage) return null;
                const m = chosenPackage.name.match(/^EC2\s+(\S+)/);
                if (!m) return null;
                const vantageUrl = `https://instances.vantage.sh/aws/ec2/${m[1]}`;
                return (
                  <a
                    href={vantageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-label-lg text-on-surface-variant hover:text-primary hover:underline"
                    title="Detailní specifikace na Vantage (benchmarky, RI ceny)"
                  >
                    Detail {chosenPackage.name.replace(/^EC2\s+/, "")} na Vantage
                    <span aria-hidden>↗</span>
                  </a>
                );
              })()}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
