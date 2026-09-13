import type { ReactNode } from "react";
import { SceneFrame } from "@/components/SceneFrame";

// Hand-drawn SVG illustrations for the example workflow rows. Field names and
// abstract bars only: no invented data. CSS in app/visuals.css loops each scene
// (reset, scan, staged build, hold); `st-N` classes set the build order.

export type SceneKind = "invoice" | "purchase-order" | "inbox";

const stage = (n: number) => `st-${n}`;

function Scene({ label, children }: { label: string; children: ReactNode }) {
  return <SceneFrame label={label}>{children}</SceneFrame>;
}

function InvoiceScene() {
  const fields = [
    { label: "Supplier", y: 100, width: 92, erpY: 106, fill: 50 },
    { label: "Amount", y: 130, width: 64, erpY: 134, fill: 34 },
    { label: "PO ref.", y: 160, width: 78, erpY: 162, fill: 42 },
  ];

  return (
    <Scene label="Illustration: fields are read from an invoice and prepared as a draft ERP entry that waits for a person to approve it.">
      <rect className="s-doc" x="24" y="30" width="136" height="200" rx="8" />
      <text className="s-label" x="38" y="54">INVOICE</text>
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
      <text className="s-label" x="250" y="86">ERP ENTRY</text>
      <rect className="s-chip" x="322" y="74" width="42" height="18" rx="9" />
      <text className="s-chip-text" x="343" y="86.5" textAnchor="middle">Draft</text>
      {fields.map((field, i) => (
        <g key={field.label}>
          <text className="s-text" x="250" y={field.erpY + 4}>{field.label}</text>
          <rect className="s-bar" x="306" y={field.erpY - 3} width="56" height="6" rx="3" />
          <rect className={`s-fill ${stage(i + 4)}`} x="306" y={field.erpY - 3} width={field.fill} height="6" rx="3" />
        </g>
      ))}

      <path className={`s-link s-draw ${stage(6)}`} d="M306 188 V 212" pathLength={1} />
      <g className={`s-pop ${stage(6)}`}>
        <rect className="s-gate" x="244" y="212" width="126" height="30" rx="15" />
        <path className="s-gate-icon" d="M258 227 l4 -4 l4 4 l-4 4 Z" />
        <text className="s-gate-text" x="274" y="231">Approve to post</text>
      </g>
    </Scene>
  );
}

function PurchaseOrderScene() {
  const rows = [
    { label: "Item", y: 92, a: 84, b: 84, match: true },
    { label: "Quantity", y: 124, a: 40, b: 40, match: true },
    { label: "Unit price", y: 156, a: 56, b: 56, match: true },
    { label: "Delivery date", y: 188, a: 64, b: 46, match: false },
  ];
  const docs = [
    { x: 24, title: "PURCHASE ORDER", key: "a" as const },
    { x: 240, title: "SUPPLIER DOC", key: "b" as const },
  ];

  return (
    <Scene label="Illustration: a supplier document is compared field by field with the purchase order, and a mismatched delivery date is flagged for the operations team.">
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
        <rect className="s-gate--held" x="118" y="236" width="164" height="30" rx="15" />
        <text className="s-gate-text" x="200" y="255" textAnchor="middle">Flagged for operations</text>
      </g>
    </Scene>
  );
}

function InboxScene() {
  const messages = [
    { y: 72, subject: 84, preview: 60, lane: 0, slot: 0 },
    { y: 106, subject: 70, preview: 72, lane: 0, slot: 1 },
    { y: 140, subject: 92, preview: 50, lane: 1, slot: 0 },
    { y: 174, subject: 64, preview: 66, lane: 1, slot: 1 },
    { y: 208, subject: 78, preview: 56, lane: 2, slot: 0 },
  ];
  const lanes = [
    { y: 40, label: "ORDERS", held: false },
    { y: 112, label: "DELIVERIES", held: false },
    { y: 184, label: "NEEDS REVIEW", held: true },
  ];

  return (
    <Scene label="Illustration: messages in a shared inbox are classified and routed to queues, and an uncertain request is held for a person to review.">
      <rect className="s-panel" x="24" y="30" width="150" height="214" rx="10" />
      <text className="s-label" x="38" y="54">SHARED INBOX</text>

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

export function WorkflowScene({ kind }: { kind: SceneKind }) {
  if (kind === "invoice") return <InvoiceScene />;
  if (kind === "purchase-order") return <PurchaseOrderScene />;
  return <InboxScene />;
}
