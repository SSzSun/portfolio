import type { Diagram } from "@/lib/validators";

const NODE_W = 120;
const NODE_H = 40;
const GAP_X = 50;
const ROW_H = 90;
const PER_ROW = 4;

/** Simple grid-laid flow diagram rendered as SVG. */
export function ArchitectureDiagram({ diagram, title }: { diagram: Diagram; title: string }) {
  if (diagram.nodes.length === 0) return null;

  const pos = new Map(
    diagram.nodes.map((n, i) => {
      const row = Math.floor(i / PER_ROW);
      const col = row % 2 === 0 ? i % PER_ROW : PER_ROW - 1 - (i % PER_ROW); // snake layout
      return [n.id, { x: 10 + col * (NODE_W + GAP_X), y: 10 + row * ROW_H }];
    }),
  );
  const cols = Math.min(diagram.nodes.length, PER_ROW);
  const rows = Math.ceil(diagram.nodes.length / PER_ROW);
  const width = 20 + cols * NODE_W + (cols - 1) * GAP_X;
  const height = 20 + (rows - 1) * ROW_H + NODE_H;

  return (
    <figure className="mt-4 overflow-x-auto rounded-[0.5rem] border border-charcoal bg-ink p-3">
      <svg
        role="img"
        aria-label={`Architecture of ${title}: ${diagram.edges
          .map((e) => `${labelOf(diagram, e.from)} to ${labelOf(diagram, e.to)}`)
          .join(", ")}`}
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto w-full min-w-[320px]"
      >
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="#33ff00" />
          </marker>
        </defs>
        {diagram.edges.map((e, i) => {
          const a = pos.get(e.from);
          const b = pos.get(e.to);
          if (!a || !b) return null;
          const x1 = a.x + NODE_W / 2;
          const y1 = a.y + NODE_H / 2;
          const x2 = b.x + NODE_W / 2;
          const y2 = b.y + NODE_H / 2;
          // Trim line to node borders.
          const dx = x2 - x1;
          const dy = y2 - y1;
          const len = Math.hypot(dx, dy) || 1;
          const t = Math.min(
            Math.abs(dx) > 0 ? NODE_W / 2 / Math.abs(dx) : Infinity,
            Math.abs(dy) > 0 ? NODE_H / 2 / Math.abs(dy) : Infinity,
          ) * len;
          const ux = dx / len;
          const uy = dy / len;
          return (
            <g key={i}>
              <line
                x1={x1 + ux * t}
                y1={y1 + uy * t}
                x2={x2 - ux * (t + 2)}
                y2={y2 - uy * (t + 2)}
                stroke="#33ff00"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                markerEnd="url(#arrow)"
              />
              {e.label && (
                <text
                  x={(x1 + x2) / 2}
                  y={(y1 + y2) / 2 - 6}
                  textAnchor="middle"
                  fill="#ffb000"
                  fontSize="11"
                  fontFamily="monospace"
                >
                  {e.label}
                </text>
              )}
            </g>
          );
        })}
        {diagram.nodes.map((n) => {
          const p = pos.get(n.id)!;
          return (
            <g key={n.id}>
              <rect x={p.x} y={p.y} width={NODE_W} height={NODE_H} fill="#1e2630" stroke="#999999" strokeWidth="2" />
              <text
                x={p.x + NODE_W / 2}
                y={p.y + NODE_H / 2 + 5}
                textAnchor="middle"
                fill="#e8e0d0"
                fontSize="14"
                fontFamily="monospace"
              >
                {n.label.length > 14 ? `${n.label.slice(0, 13)}…` : n.label}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}

function labelOf(d: Diagram, id: string) {
  return d.nodes.find((n) => n.id === id)?.label ?? id;
}
