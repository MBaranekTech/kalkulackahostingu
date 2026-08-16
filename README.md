# kalkulackahostingu.cz

> _"Možná nepotřebujete AWS."_

Hosting price comparison calculator for the Czech market. Compare AWS,
Hetzner, MasterDC, and Forpsi for typical small-business workloads — with
hidden costs surfaced up-front, opinionated articles, and a weekly auto-refresh
of vendor prices.

**Versioning:** CalVer (`vYYYY.MM.DD`, derived from data refresh) · **Live:** <https://kalkulackahostingu.cz>

## What it does

Pick a project type (static site / WordPress shop / API+DB / high-traffic),
adjust sliders for traffic / DB / storage / transfer, and the page shows the
monthly cost on each provider — picking the cheapest fitting package, adding
overages, and listing the gotchas you'd otherwise read about on a forum at 2 AM.

All calculation is client-side. Prices live in `data/providers.json` and
refresh weekly via a GitHub Action.

## Tech stack

- **Next.js 16** (App Router, static export → `out/`)
- **TypeScript** (strict)
- **Tailwind CSS v4** with a custom translucent design system — deep plum
  surfaces, geometric color fields, monospaced type, and outlined controls
- **Cloudflare Pages** for hosting; Cloudflare DNS + CDN
- **`@xyflow/react`** — interactive codebase map on `/o-mne` (route-split,
  doesn't load on the calculator)
- **`tsx`** — runs the weekly price-refresh script in CI

No server runtime — every page is prerendered HTML + JS at build time.

## Quick start

Requires **Node.js 20+**.

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static export → ./out
npm run lint
npx tsc --noEmit     # type check
```

## Public routes

| Route | What it is |
|---|---|
| `/` | Hero · calculator · articles teaser · contact CTA · methodology |
| `/clanky` | Article index (cards grid) |
| `/clanky/proc-aws-neni-pro-male-firmy` | Opinion piece on AWS for small firms |
| `/clanky/proc-mit-data-v-cr` | Compliance / latency angle for CZ datacenter |
| `/clanky/pet-skrytych-nakladu-aws` | Concrete numbers on AWS hidden costs |
| `/o-mne` | Personal positioning lead · about Martin (DevOps / Linux / AI systems) · project version · codebase map · key code snippet |

## Project structure

```
data/
  providers.json              # single source of truth for all prices

src/
  app/
    layout.tsx                # SEO meta, Archivo + JetBrains Mono
    page.tsx                  # home — hero + calculator + articles teaser + CTA
    globals.css               # plum translucent tokens and geometric canvas
    icon.svg                  # Next App Router favicon (auto-detected)
    clanky/
      page.tsx                # article index
      <slug>/page.tsx         # one file per article (×3)
    o-mne/
      page.tsx                # about + version chip + codebase map

  components/
    CalculatorApp.tsx         # stateful client component — owns scenario + input
    ScenarioPicker.tsx        # 4 preset scenarios as a ruled selection grid
    InputSliders.tsx          # traffic / DB / storage / transfer + toggles
    ResultsTable.tsx          # sorted list of providers
    ProviderCard.tsx          # per-provider card with breakdown + Vantage link
    Recommendation.tsx        # context-aware suggestion box
    HiddenCosts.tsx           # gotchas (NAT Gateway, snapshots, …)
    ContactCTA.tsx            # mailto for consultations
    ArticlesTeaser.tsx        # top-3 article cards on home
    ArticleCard.tsx           # single article card (index + teaser)
    ArticleLayout.tsx         # shared article shell — header, prose, footer CTA
    Header.tsx                # typographic wordmark + navigation
    Footer.tsx                # data freshness + version label
    CodebaseMap.tsx           # React Flow node-link graph on /o-mne
    ui/                       # Card, Chip, Slider, Switch primitives

  lib/
    types.ts                  # canonical types — read this first
    providers.ts              # loads JSON, exports providers + scenarios
    calculator.ts             # pickPackage + overage math + currency conversion
    articles.ts               # article metadata (slug, title, date, tags)
    version.ts                # APP_VERSION — bump with package.json

public/
  logo.svg                    # full wordmark version (mark + "kalkulackahostingu.cz")
  logo-mark.svg               # square mark for OG / social

scripts/
  fetch-prices.ts             # weekly price refresher (see below)

.github/
  workflows/
    check-prices.yml          # weekly cron + PR / issue automation
```

## How the calculator works

Each `Provider` has:

- A list of **packages** (real SKUs the vendor publishes — `CCX13`, `EC2
  t3.small`, `VPS Start`) with `vcpu`, `ramGB`, included storage and transfer,
  a price in the vendor's native currency, and a `source.url` + `fetchedAt`.
- **Overage rates** for storage and transfer above what the package includes.
- Optional **`managedDb`** (currently only AWS RDS) for vendors that bill
  databases separately from the VPS.

`calculate(input, provider, rates)`:

1. Estimates needed `vcpu` + `ramGB` from `monthlyVisitors`.
2. `pickPackage()` returns the cheapest SKU with `vcpu ≥ needed && ram ≥ needed`,
   or marks `insufficientCapacity` and falls back to the largest available.
3. Adds extra-storage / extra-transfer / managed-DB / CDN costs using the
   provider's overage rates.
4. Converts everything to CZK via `exchangeRate`.

The calculator never mutates `providers.json` — it consumes it. AWS package
cards also deep-link to <https://instances.vantage.sh/aws/ec2/<type>> for
benchmarks, network performance, and Reserved/Spot pricing the calculator
doesn't try to reproduce.

## Keeping prices fresh

Hosting prices change rarely (months), but they _do_ change. Manual quarterly
updates is how comparison sites quietly go stale. Instead:

- **`scripts/fetch-prices.ts`** pulls live prices each week:
  - AWS — official [Bulk Pricing API](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/price-changes.html)
    for EC2 + RDS in `eu-central-1` (no auth, ~150 MB JSON).
  - Hetzner — hand-maintained: their Cloud API now requires a project
    token for every endpoint (incl. `/v1/pricing`), and the public
    pricing page is JS-rendered. Reviewed quarterly.
  - MasterDC, Forpsi — HTML scrape (anchor-tag-specific CZK price regex).
  - Exchange rates — ECB daily reference rates XML.
- The script **validates** the new JSON before writing (positive amounts,
  known currencies, source metadata present) and refuses to write a broken
  file.
- **`.github/workflows/check-prices.yml`** runs the fetcher every Monday at
  06:00 UTC (and on manual dispatch). It:
  - Opens a PR with a price-change diff table (`Before | After | Δ%`) if
    anything changed.
  - Opens an issue if any per-package fetcher errored — most likely cause
    is a Czech provider changing their HTML.
  - Fails the workflow red if validation rejected the new file.

Merging the PR triggers a Cloudflare Pages redeploy automatically. **You never
auto-commit prices to `main`** — a human eyeballs the diff first.

You can run the fetcher locally:

```bash
npm run fetch-prices
```

## Articles

Three launch posts live under `/clanky`. Each is a plain TSX page — no MDX
dependency, no CMS. Article metadata (slug, title, excerpt, date, tags,
reading minutes) lives in **`src/lib/articles.ts`** so the index page and home
teaser stay in sync automatically.

The `ArticleLayout` component handles the shared header (tags + title +
date), prose container, and a footer that links back to the calculator. Each
article body is real prose, not lorem ipsum.

If you scale past ~5 posts and JSX-in-page editing starts feeling clunky,
that's the moment to add `@next/mdx` and migrate the bodies — until then,
plain TSX is the simpler choice.

## Branding & design

- **Wordmark** — a compact two-line typographic mark keeps the product name
  readable in the narrow header without competing with the calculator.
- **Single visual theme** — deep plum surfaces, pink geometric fields, bright
  typography, and outlined form controls keep the calculator focused.
- **Design system** — custom color, type, shape, elevation, and motion tokens
  live in `src/app/globals.css`. No external UI library; every primitive is in
  `src/components/ui/`.

## Versioning — CalVer

This project uses **calendar versioning** (`vYYYY.MM.DD`) for the user-facing
label, not SemVer. The version is computed in `src/lib/version.ts` directly
from `data/providers.json`'s `lastUpdated` field — every weekly price refresh
automatically bumps the version.

Why CalVer:

- The meaningful "release" of a price-comparison tool is when *prices change*,
  not when *code commits*. SemVer would conflate the two and bury the
  user-relevant signal ("are these numbers fresh?").
- Visitors read freshness directly from the version label — no separate
  "last updated" line needed.
- Removes the bikeshed of "is this a patch or a minor?" — the weekly cron
  decides automatically.

`package.json` keeps a SemVer-shaped `version` field (`0.1.0`) for npm /
tooling compatibility; only the user-facing label uses CalVer. They're
intentionally decoupled — bump `package.json` only on breaking changes you
want to signal to downstream consumers.

## Adding things

### A new provider

1. Add a `Provider` entry to `data/providers.json` with at least one package
   (correct `vcpu`/`ramGB`/`includedStorageGB`/`includedTransferGB` and a
   published `source.url`).
2. Add it to the `ProviderId` union in `src/lib/types.ts`.
3. Add a fetcher in `scripts/fetch-prices.ts` and wire it into the `switch`
   in `main()`.
4. Add a node to `CodebaseMap.tsx` if you want it on the architecture map.
5. Run `npm run fetch-prices` to confirm prices come through.

The UI requires no changes — it iterates over `providers` from the JSON.

### A new scenario

Append a `Scenario` to `data/providers.json` with sensible defaults. The
calculator and UI pick it up automatically. Optionally list providers in
`bestFor` so `Recommendation.tsx` can prefer them when relevant.

### A new article

1. Append a metadata entry to **`src/lib/articles.ts`** (top of the array —
   newest first).
2. Create `src/app/clanky/<slug>/page.tsx` importing `ArticleLayout` and
   passing the meta. Write the body as plain JSX/prose.
3. Index page (`/clanky`) and the home teaser pick it up automatically.

## Deployment

Cloudflare Pages → connected to this repo's `main` branch:

- Build command: `npm run build`
- Output directory: `out`
- Node version: 20

DNS for `kalkulackahostingu.cz` is on Cloudflare; SSL is auto-issued via
Let's Encrypt. Custom domain wired in the Pages project settings.

## Disclaimers

All numbers shown are **orientational**. They model the dominant cost lines
but cannot account for every billable item (e.g. AWS region-to-region
transfer, private link, optional backups). Always validate against the
provider's own calculator before signing up.

## License

MIT.

## Contact

[Martin Baránek](https://baranekm.cz) · `martin.baranek@outlook.com`
