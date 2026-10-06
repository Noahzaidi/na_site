import type { ReactNode } from "react";
import type { MotionText } from "@/components/MotionToggle";
import { SceneFrame } from "@/components/SceneFrame";
import type { Dictionary } from "@/content/i18n/types";

// Hand-drawn SVG illustrations for the example workflow rows. Field names and
// abstract bars only: no invented data. CSS in app/visuals.css loops each scene
// (reset, scan, staged build, hold); `st-N` classes set the build order.
// Labels come from the dictionary; SVG text cannot wrap, so the pills and bars
// around a label are sized from its length (the English layout is the minimum).

export type SceneKind = "invoice" | "purchase-order" | "inbox";

type SceneText = Dictionary["home"]["scenes"];

type SceneProps = {
  label: string;
  chip: string;
  media: MotionText;
  children: ReactNode;
};

const stage = (n: number) => `st-${n}`;

// Approximate advance widths (px per character) of the scene label styles.
const TEXT_12 = 6.2; // .s-text
const CHIP_10 = 5.4; // .s-chip-text
const GATE_11_5 = 5.6; // .s-gate-text

function Scene({ label, chip, media, children }: SceneProps) {
  return (
    <SceneFrame label={label} chip={chip} t={media}>
      {children}
    </SceneFrame>
  );
}

function InvoiceScene({ t, chip, media }: { t: SceneText["invoice"]; chip: string; media: MotionText }) {
  const fields = [
    { label: t.supplier, y: 100, width: 92, erpY: 106, fill: 50 },
    { label: t.amount, y: 130, width: 64, erpY: 134, fill: 34 },
    { label: t.poRef, y: 160, width: 78, erpY: 162, fill: 42 },
  ];
  // ERP entry rows: the value bars start after the longest field name and end at x=362.
  const longest = Math.max(...fields.map((field) => field.label.length));
  const barX = Math.max(306, Math.round(250 + longest * TEXT_12 + 6));
  const barWidth = 362 - barX;
  const chipWidth = Math.max(42, Math.round(t.draft.length * CHIP_10 + 14));
  const gateWidth = Math.max(126, Math.round(42 + t.gate.length * GATE_11_5));
  const gateX = 307 - gateWidth / 2;

  return (
    <Scene label={t.label} chip={chip} media={media}>
      <rect className="s-doc" x="24" y="30" width="136" height="200" rx="8" />
      <text className="s-label" x="38" y="54">{t.doc}</text>
      <rect className="s-bar-strong" x="38" y="64" width="64" height="6" rx="3" />
      <rect className="s-bar" x="38" y="76" width="44" height="5" rx="2.5" />
      {fields.map((field, i) => (
        <g key={field.label}>
          <rect className="s-bar" x="40" y={field.y} width="36" height="5" rx="2.5" />
          <rect className="s-bar-strong" x="40" y={field.y + 9} width={field.width} height="6" rx="3" />
          <rect className={`s-hit s-pop ${stage(i + 2)}`} x="32" y={field.y - 7} width="120" height="28" rx="5" />
        </g>
      ))}
      <rect className="s-bar" x="40" y="198" width="100" height="4" rx="2" />
      <rect className="s-bar" x="40" y="208" width="72" height="4" rx="2" />
      <rect className={`s-scan ${stage(1)}`} x="28" y="36" width="128" height="2" rx="1" />

      {fields.map((field, i) => (
        <path
          key={field.label}
          className={`s-link s-draw ${stage(i + 3)}`}
          d={`M152 ${field.y + 7} C 194 ${field.y + 7}, 196 ${field.erpY}, 236 ${field.erpY}`}
          pathLength={1}
        />
      ))}

      <rect className="s-panel" x="236" y="64" width="140" height="124" rx="10" />
      <text className="s-label" x="250" y="86">{t.erp}</text>
      <rect className="s-chip" x={364 - chipWidth} y="74" width={chipWidth} height="18" rx="9" />
      <text className="s-chip-text" x={364 - chipWidth / 2} y="86.5" textAnchor="middle">{t.draft}</text>
      {fields.map((field, i) => (
        <g key={field.label}>
          <text className="s-text" x="250" y={field.erpY + 4}>{field.label}</text>
          <rect className="s-bar" x={barX} y={field.erpY - 3} width={barWidth} height="6" rx="3" />
          <rect
            className={`s-fill ${stage(i + 4)}`}
            x={barX}
            y={field.erpY - 3}
            width={Math.round((field.fill / 56) * barWidth)}
            height="6"
            rx="3"
          />
        </g>
      ))}

      <path className={`s-link s-draw ${stage(6)}`} d="M306 188 V 212" pathLength={1} />
      <g className={`s-pop ${stage(6)}`}>
        <rect className="s-gate" x={gateX} y="212" width={gateWidth} height="30" rx="15" />
        <path className="s-gate-icon" d={`M${gateX + 14} 227 l4 -4 l4 4 l-4 4 Z`} />
        <text className="s-gate-text" x={gateX + 30} y="231">{t.gate}</text>
      </g>
    </Scene>
  );
}

function PurchaseOrderScene({
  t,
  chip,
  media,
}: {
  t: SceneText["purchaseOrder"];
  chip: string;
  media: MotionText;
}) {
  const rows = [
    { label: t.item, y: 92, a: 84, b: 84, match: true },
    { label: t.quantity, y: 124, a: 40, b: 40, match: true },
    { label: t.unitPrice, y: 156, a: 56, b: 56, match: true },
    { label: t.deliveryDate, y: 188, a: 64, b: 46, match: false },
  ];
  const docs = [
    { x: 24, title: t.po, key: "a" as const },
    { x: 240, title: t.supplierDoc, key: "b" as const },
  ];
  const gateWidth = Math.max(164, Math.round(28 + t.gate.length * GATE_11_5));

  return (
    <Scene label={t.label} chip={chip} media={media}>
      {docs.map((doc) => (
        <g key={doc.title}>
          <rect className="s-doc" x={doc.x} y="30" width="136" height="186" rx="8" />
          <text className="s-label" x={doc.x + 14} y="54">{doc.title}</text>
          {rows.map((row) => (
            <g key={row.label}>
              <text className="s-text-sm" x={doc.x + 14} y={row.y - 6}>{row.label}</text>
              <rect className="s-bar-strong" x={doc.x + 14} y={row.y} width={row[doc.key]} height="6" rx="3" />
            </g>
          ))}
          <rect className={`s-scan ${stage(1)}`} x={doc.x + 4} y="36" width="128" height="2" rx="1" />
        </g>
      ))}

      {rows.map((row, i) =>
        row.match ? (
          <g key={row.label}>
            <path className={`s-link s-draw ${stage(i + 2)}`} d={`M160 ${row.y + 3} H 240`} pathLength={1} />
            <g className={`s-pop ${stage(i + 2)}`}>
              <circle className="s-ok" cx="200" cy={row.y + 3} r="8" />
              <path className="s-ok-mark" d={`M196.5 ${row.y + 3} l2.5 2.5 l4.5 -5`} />
            </g>
          </g>
        ) : (
          <g key={row.label} className={`s-pop ${stage(5)}`}>
            <rect className="s-hit--held" x="246" y={row.y - 17} width="124" height="30" rx="5" />
            <path className="s-link s-link--held" d={`M160 ${row.y + 3} H 240`} />
            <circle className="s-warn" cx="200" cy={row.y + 3} r="8" />
            <path className="s-warn-mark" d={`M200 ${row.y - 1} v 4`} />
            <circle className="s-warn-dot" cx="200" cy={row.y + 6.5} r="0.9" />
          </g>
        ),
      )}

      <g className={`s-pop ${stage(6)}`}>
        <path className="s-link s-link--held" d="M200 200 V 236" />
        <rect className="s-gate--held" x={200 - gateWidth / 2} y="236" width={gateWidth} height="30" rx="15" />
        <text className="s-gate-text" x="200" y="255" textAnchor="middle">{t.gate}</text>
      </g>
    </Scene>
  );
}

function InboxScene({ t, chip, media }: { t: SceneText["inbox"]; chip: string; media: MotionText }) {
  const messages = [
    { y: 72, subject: 84, preview: 60, lane: 0, slot: 0 },
    { y: 106, subject: 70, preview: 72, lane: 0, slot: 1 },
    { y: 140, subject: 92, preview: 50, lane: 1, slot: 0 },
    { y: 174, subject: 64, preview: 66, lane: 1, slot: 1 },
    { y: 208, subject: 78, preview: 56, lane: 2, slot: 0 },
  ];
  const lanes = [
    { y: 40, label: t.orders, held: false },
    { y: 112, label: t.deliveries, held: false },
    { y: 184, label: t.review, held: true },
  ];

  return (
    <Scene label={t.label} chip={chip} media={media}>
      <rect className="s-panel" x="24" y="30" width="150" height="214" rx="10" />
      <text className="s-label" x="38" y="54">{t.inbox}</text>

      {lanes.map((lane) => (
        <g key={lane.label}>
          <rect className={lane.held ? "s-lane s-lane--held" : "s-lane"} x="240" y={lane.y} width="136" height="56" rx="10" />
          <text className="s-label" x="254" y={lane.y + 21}>{lane.label}</text>
        </g>
      ))}

      {messages.map((message, i) => {
        const lane = lanes[message.lane];
        const laneY = lane.y + 28;
        return (
          <g key={message.y}>
            <circle className="s-dot-muted" cx="42" cy={message.y + 10} r="3.5" />
            <circle
              className={`${lane.held ? "s-dot--held" : "s-dot"} s-pop ${stage(i + 2)}`}
              cx="42"
              cy={message.y + 10}
              r="3.5"
            />
            <rect className="s-bar-strong" x="54" y={message.y + 4} width={message.subject} height="5" rx="2.5" />
            <rect className="s-bar" x="54" y={message.y + 13} width={message.preview} height="4" rx="2" />
            {lane.held ? (
              <path
                className={`s-link s-link--held s-pop ${stage(i + 2)}`}
                d={`M174 ${message.y + 10} C 208 ${message.y + 10}, 206 ${laneY}, 240 ${laneY}`}
              />
            ) : (
              <path
                className={`s-link s-draw ${stage(i + 2)}`}
                d={`M174 ${message.y + 10} C 208 ${message.y + 10}, 206 ${laneY}, 240 ${laneY}`}
                pathLength={1}
              />
            )}
            <rect
              className={`${lane.held ? "s-pill--held" : "s-pill"} s-pop ${stage(i + 2)}`}
              x={254 + message.slot * 50}
              y={lane.y + 33}
              width="42"
              height="12"
              rx="6"
            />
          </g>
        );
      })}
    </Scene>
  );
}

type WorkflowSceneProps = {
  kind: SceneKind;
  t: SceneText;
  /** "Illustrative workflow" chip. */
  chip: string;
  media: MotionText;
};

export function WorkflowScene({ kind, t, chip, media }: WorkflowSceneProps) {
  if (kind === "invoice") return <InvoiceScene t={t.invoice} chip={chip} media={media} />;
  if (kind === "purchase-order") {
    return <PurchaseOrderScene t={t.purchaseOrder} chip={chip} media={media} />;
  }
  return <InboxScene t={t.inbox} chip={chip} media={media} />;
}
