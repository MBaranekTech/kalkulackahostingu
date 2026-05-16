import data from "../../data/providers.json";
import type {
  ExchangeRate,
  Provider,
  ProvidersDataFile,
  Scenario,
} from "./types";

const typed = data as ProvidersDataFile;

export const providers: Provider[] = typed.providers;
export const scenarios: Scenario[] = typed.scenarios;
export const lastUpdated: string = typed.lastUpdated;
export const exchangeRate: ExchangeRate = typed.exchangeRate;

export function getScenario(id: string): Scenario | undefined {
  return scenarios.find((s) => s.id === id);
}
