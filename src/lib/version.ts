import { lastUpdated } from "./providers";

/**
 * Calendar versioning (CalVer) — the version follows the most recent data
 * refresh, not arbitrary code releases.
 *
 * Format: `vYYYY.MM.DD` (e.g. `v2026.05.13`).
 *
 * Why CalVer over SemVer for this project:
 * - The meaningful "release" of a price-comparison tool is when prices
 *   change. SemVer would conflate code commits with the user-relevant
 *   signal ("are these numbers fresh?").
 * - Visitors instantly read freshness from the version label — no tooltip
 *   or separate "last updated" row needed.
 * - Removes the bikeshed of "is this a patch or a minor?" — the weekly
 *   cron decides automatically.
 *
 * `package.json` keeps SemVer (`0.1.0`) for npm tooling compatibility;
 * only the user-facing label uses CalVer.
 */
export const APP_VERSION = lastUpdated; // e.g. "2026-05-13"
export const APP_VERSION_LABEL = `v${lastUpdated.replace(/-/g, ".")}`;

export const GITHUB_URL = "https://github.com/baranekm/kalkulackahostingu";
