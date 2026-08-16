"use client";

import { useMemo } from "react";
import {
  Background,
  BackgroundVariant,
  Controls,
  type Edge,
  Handle,
  MarkerType,
  type Node,
  type NodeProps,
  Position,
  ReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

type Group = "data" | "logic" | "ui" | "routes" | "automation";

interface NodeData {
  /** Display label — usually a file name. */
  label: string;
  /** One-line description rendered in muted text. */
  note: string;
  group: Group;
  [key: string]: unknown;
}

const GROUP_LABEL: Record<Group, string> = {
  data: "Data",
  logic: "Logic",
  ui: "UI",
  routes: "Routes",
  automation: "Automation",
};

// Class strings (Tailwind) per group — same M3 tokens as the rest of the site.
const GROUP_STYLE: Record<Group, { card: string; chip: string }> = {
  data: {
    card: "bg-primary-container border-primary/40 text-on-primary-container",
    chip: "bg-primary text-on-primary",
  },
  logic: {
    card: "bg-tertiary-container border-tertiary/40 text-on-tertiary-container",
    chip: "bg-tertiary text-on-tertiary",
  },
  ui: {
    card: "bg-secondary-container border-secondary/40 text-on-secondary-container",
    chip: "bg-secondary text-on-secondary",
  },
  routes: {
    card: "bg-success-container border-success/40 text-on-success-container",
    chip: "bg-success text-on-success",
  },
  automation: {
    card: "bg-surface-container border-outline-variant text-on-surface",
    chip: "bg-on-surface-variant text-surface",
  },
};

function CodeNode({ data }: NodeProps<Node<NodeData>>) {
  const style = GROUP_STYLE[data.group];
  return (
    <div
      className={`rounded-sm border ${style.card} px-3 py-2 min-w-44 max-w-56`}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-on-surface-variant !w-1.5 !h-1.5 !border-0"
      />
      <div className="flex items-center justify-between gap-2 mb-1">
        <span className="font-mono text-label-md font-semibold truncate">
          {data.label}
        </span>
        <span
          className={`text-[10px] uppercase rounded-xs px-2 py-0.5 ${style.chip} font-medium shrink-0`}
        >
          {GROUP_LABEL[data.group]}
        </span>
      </div>
      <div className="text-label-md opacity-80 leading-snug">
        {data.note}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-on-surface-variant !w-1.5 !h-1.5 !border-0"
      />
    </div>
  );
}

const nodeTypes = { code: CodeNode };

/**
 * Hand-curated dependency graph for the project. Adding a new file =
 * append a node here. Order is layer-by-layer top → bottom:
 *   routes (top) → app-level wiring → UI components → lib → data → automation.
 */
const NODES: Node<NodeData>[] = [
  // ── Layer 1: Routes (y = 0) ──────────────────────────────────────────
  {
    id: "page",
    type: "code",
    position: { x: 60, y: 0 },
    data: {
      label: "app/page.tsx",
      note: "Domovská — hero + kalkulačka + články",
      group: "routes",
    },
  },
  {
    id: "clanky-index",
    type: "code",
    position: { x: 320, y: 0 },
    data: {
      label: "app/clanky/page.tsx",
      note: "Index všech článků",
      group: "routes",
    },
  },
  {
    id: "clanky-slug",
    type: "code",
    position: { x: 580, y: 0 },
    data: {
      label: "app/clanky/<slug>/page.tsx",
      note: "Jednotlivý článek (3 stránky)",
      group: "routes",
    },
  },
  {
    id: "o-mne",
    type: "code",
    position: { x: 840, y: 0 },
    data: {
      label: "app/o-mne/page.tsx",
      note: "Tato stránka",
      group: "routes",
    },
  },

  // ── Layer 2: page composition / chrome (y = 160) ─────────────────────
  {
    id: "calc-app",
    type: "code",
    position: { x: 60, y: 160 },
    data: {
      label: "CalculatorApp.tsx",
      note: "Stav scénáře + parametrů",
      group: "ui",
    },
  },
  {
    id: "header",
    type: "code",
    position: { x: 320, y: 160 },
    data: {
      label: "Header.tsx",
      note: "Navigace + kontakt",
      group: "ui",
    },
  },
  {
    id: "codebase-map",
    type: "code",
    position: { x: 820, y: 160 },
    data: {
      label: "CodebaseMap.tsx",
      note: "Tato mapa",
      group: "ui",
    },
  },
  {
    id: "articles-teaser",
    type: "code",
    position: { x: 60, y: 300 },
    data: {
      label: "ArticlesTeaser.tsx",
      note: "3 karty článků na home",
      group: "ui",
    },
  },
  {
    id: "article-layout",
    type: "code",
    position: { x: 580, y: 300 },
    data: {
      label: "ArticleLayout.tsx",
      note: "Šablona jednoho článku",
      group: "ui",
    },
  },

  // ── Layer 3: UI primitives (y = 460) ─────────────────────────────────
  {
    id: "scenario-picker",
    type: "code",
    position: { x: 0, y: 460 },
    data: {
      label: "ScenarioPicker.tsx",
      note: "4 typové scénáře",
      group: "ui",
    },
  },
  {
    id: "input-sliders",
    type: "code",
    position: { x: 240, y: 460 },
    data: {
      label: "InputSliders.tsx",
      note: "Slidery + toggly",
      group: "ui",
    },
  },
  {
    id: "results-table",
    type: "code",
    position: { x: 480, y: 460 },
    data: {
      label: "ResultsTable.tsx",
      note: "Seřazení + recommendation",
      group: "ui",
    },
  },
  {
    id: "provider-card",
    type: "code",
    position: { x: 720, y: 460 },
    data: {
      label: "ProviderCard.tsx",
      note: "Karta poskytovatele + rozpad",
      group: "ui",
    },
  },

  // ── Layer 4: lib (y = 640) ───────────────────────────────────────────
  {
    id: "providers-lib",
    type: "code",
    position: { x: 120, y: 640 },
    data: {
      label: "lib/providers.ts",
      note: "Načtení JSON v build-time",
      group: "logic",
    },
  },
  {
    id: "calculator",
    type: "code",
    position: { x: 380, y: 640 },
    data: {
      label: "lib/calculator.ts",
      note: "pickPackage + overage + převody měn",
      group: "logic",
    },
  },
  {
    id: "types",
    type: "code",
    position: { x: 640, y: 640 },
    data: {
      label: "lib/types.ts",
      note: "Kanonické typy",
      group: "logic",
    },
  },
  {
    id: "articles-lib",
    type: "code",
    position: { x: 900, y: 640 },
    data: {
      label: "lib/articles.ts",
      note: "Metadata blogu",
      group: "logic",
    },
  },

  // ── Layer 5: data (y = 800) ──────────────────────────────────────────
  {
    id: "providers-json",
    type: "code",
    position: { x: 320, y: 800 },
    data: {
      label: "data/providers.json",
      note: "Single source of truth pro ceny",
      group: "data",
    },
  },

  // ── Layer 6: automation (off to the right, spans layers 4-5) ─────────
  {
    id: "fetch-prices",
    type: "code",
    position: { x: 1120, y: 640 },
    data: {
      label: "scripts/fetch-prices.ts",
      note: "Týdenní refresh — AWS + Hetzner + scrape",
      group: "automation",
    },
  },
  {
    id: "workflow",
    type: "code",
    position: { x: 1120, y: 460 },
    data: {
      label: ".github/check-prices.yml",
      note: "Po 06:00 UTC cron, opens PR",
      group: "automation",
    },
  },
];

const EDGES: Edge[] = [
  // Routes → page-level composition
  { id: "page→calc", source: "page", target: "calc-app" },
  { id: "page→header", source: "page", target: "header" },
  { id: "page→teaser", source: "page", target: "articles-teaser" },
  { id: "clanky-index→header", source: "clanky-index", target: "header" },
  { id: "clanky-slug→layout", source: "clanky-slug", target: "article-layout" },
  { id: "o-mne→header", source: "o-mne", target: "header" },
  { id: "o-mne→map", source: "o-mne", target: "codebase-map" },

  // Calculator composition
  { id: "calc→scenario", source: "calc-app", target: "scenario-picker" },
  { id: "calc→inputs", source: "calc-app", target: "input-sliders" },
  { id: "calc→results", source: "calc-app", target: "results-table" },
  { id: "results→provider", source: "results-table", target: "provider-card" },

  // UI → lib
  { id: "calc→providers", source: "calc-app", target: "providers-lib" },
  { id: "calc→calculator", source: "calc-app", target: "calculator" },
  { id: "teaser→articles-lib", source: "articles-teaser", target: "articles-lib" },
  { id: "layout→articles-lib", source: "article-layout", target: "articles-lib" },

  // lib internal
  { id: "calculator→types", source: "calculator", target: "types" },
  { id: "providers-lib→types", source: "providers-lib", target: "types" },
  { id: "providers-lib→json", source: "providers-lib", target: "providers-json" },

  // Automation
  { id: "workflow→fetch", source: "workflow", target: "fetch-prices" },
  { id: "fetch→json", source: "fetch-prices", target: "providers-json" },
  { id: "fetch→types", source: "fetch-prices", target: "types" },
];

const defaultEdgeOptions = {
  type: "smoothstep" as const,
  animated: false,
  markerEnd: { type: MarkerType.ArrowClosed, width: 14, height: 14 },
  style: { stroke: "hsl(var(--md-outline))", strokeWidth: 1.5 },
};

export function CodebaseMap() {
  // Stable refs so React Flow doesn't re-init on every render.
  const nodes = useMemo(() => NODES, []);
  const edges = useMemo(() => EDGES, []);

  return (
    <div className="h-[640px] w-full rounded-sm overflow-hidden border border-on-surface bg-surface-low">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        proOptions={{ hideAttribution: true }}
        minZoom={0.3}
        maxZoom={2}
        nodesDraggable
        nodesConnectable={false}
        elementsSelectable={false}
        colorMode="dark"
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="hsl(var(--md-outline-variant))"
        />
        <Controls
          showInteractive={false}
          className="!bg-surface !border !border-on-surface !rounded-sm !shadow-none"
        />
      </ReactFlow>

      {/* Legend */}
      <div className="flex flex-wrap gap-2 px-4 py-3 border-t border-outline-variant bg-surface text-label-md">
        {(["routes", "ui", "logic", "data", "automation"] as Group[]).map(
          (g) => (
            <span
              key={g}
              className={`inline-flex items-center gap-1.5 rounded-xs px-2.5 py-0.5 border ${GROUP_STYLE[g].card}`}
            >
              <span
                className={`w-2 h-2 rounded-full ${GROUP_STYLE[g].chip}`}
                aria-hidden
              />
              {GROUP_LABEL[g]}
            </span>
          ),
        )}
        <span className="ml-auto text-on-surface-variant">
          Přetáhněte uzly · scroll = zoom
        </span>
      </div>
    </div>
  );
}
