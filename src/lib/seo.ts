export const SITE_URL = "https://kalkulackahostingu.cz";
export const SITE_NAME = "KalkulackaHostingu.cz";
export const AUTHOR_NAME = "Martin Baránek";
export const AUTHOR_URL = "https://baranekm.cz";
export const CONTENT_LAST_MODIFIED = "2026-08-16";

export const DEFAULT_DESCRIPTION =
  "Kalkulačka ceny hostingu porovná AWS, Hetzner, MasterDC a Forpsi. Spočítejte měsíční náklady na server, databázi, přenos dat i skryté poplatky.";

export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE_URL).toString();
}