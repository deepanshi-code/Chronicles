import type { Flowchart, FlowNode } from "@/data/projects";

const COL_GAP = 40;
const ROW_HEIGHT = 170;
const LINE_COLOR = "rgba(255,255,255,0.18)";
const ARROW_COLOR = "rgba(255,255,255,0.32)";
const CLUSTER_PAD = 22;

const SHAPE_SIZE: Record<FlowNode["shape"], { width: number; height: number }> = {
  start: { width: 160, height: 56 },
  end: { width: 170, height: 60 },
  process: { width: 188, height: 100 },
  io: { width: 188, height: 92 },
  decision: { width: 176, height: 150 },
};

type LaidOutNode = FlowNode & {
  x: number;
  y: number;
  width: number;
  height: number;
  row: number;
};

function hexToRgba(hex: string, alpha: number) {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function layout(flow: Flowchart) {
  const { nodes, edges } = flow;
  const layerOf = new Map<string, number>();
  nodes.forEach((n) => layerOf.set(n.id, 0));

  for (let i = 0; i < nodes.length + edges.length; i++) {
    let changed = false;
    edges.forEach((e) => {
      const candidate = (layerOf.get(e.from) ?? 0) + 1;
      if ((layerOf.get(e.to) ?? 0) < candidate) {
        layerOf.set(e.to, candidate);
        changed = true;
      }
    });
    if (!changed) break;
  }

  // Group nodes within a row by cluster so same-cluster members sit
  // horizontally adjacent, keeping each cluster's bounding region tidy.
  const clusterIndexOf = new Map<string, number>();
  (flow.clusters ?? []).forEach((cluster, i) => {
    cluster.nodeIds.forEach((id) => clusterIndexOf.set(id, i));
  });

  const maxLayer = Math.max(...Array.from(layerOf.values()), 0);
  const rows: FlowNode[][] = Array.from({ length: maxLayer + 1 }, () => []);
  nodes.forEach((n) => rows[layerOf.get(n.id) ?? 0].push(n));
  rows.forEach((row) =>
    row.sort((a, b) => (clusterIndexOf.get(a.id) ?? -1) - (clusterIndexOf.get(b.id) ?? -1)),
  );

  const rowWidths = rows.map(
    (row) =>
      row.reduce((sum, n) => sum + SHAPE_SIZE[n.shape].width, 0) +
      COL_GAP * Math.max(row.length - 1, 0),
  );
  const svgWidth = Math.max(...rowWidths, 320) + CLUSTER_PAD * 2;

  const laidOut = new Map<string, LaidOutNode>();
  rows.forEach((row, rowIndex) => {
    const rowWidth = rowWidths[rowIndex];
    let cursor = (svgWidth - rowWidth) / 2;
    row.forEach((n) => {
      const size = SHAPE_SIZE[n.shape];
      const y = CLUSTER_PAD + rowIndex * ROW_HEIGHT + (ROW_HEIGHT - size.height) / 2;
      laidOut.set(n.id, { ...n, x: cursor, y, width: size.width, height: size.height, row: rowIndex });
      cursor += size.width + COL_GAP;
    });
  });

  const svgHeight = CLUSTER_PAD * 2 + (maxLayer + 1) * ROW_HEIGHT;
  return { laidOut, svgWidth, svgHeight };
}

// Splits a cluster's member nodes into bounding boxes, one per contiguous
// run of rows, so a cluster whose members land in non-adjacent rows never
// draws one giant box that swallows an unrelated cluster in between.
function clusterRuns(members: LaidOutNode[]) {
  const byRow = new Map<number, LaidOutNode[]>();
  members.forEach((n) => {
    const arr = byRow.get(n.row) ?? [];
    arr.push(n);
    byRow.set(n.row, arr);
  });
  const sortedRows = Array.from(byRow.keys()).sort((a, b) => a - b);
  const runs: number[][] = [];
  sortedRows.forEach((r, i) => {
    if (i > 0 && r === sortedRows[i - 1] + 1) {
      runs[runs.length - 1].push(r);
    } else {
      runs.push([r]);
    }
  });
  return runs.map((runRows) => runRows.flatMap((r) => byRow.get(r) ?? []));
}

function edgePath(from: LaidOutNode, to: LaidOutNode, offset = 0) {
  const sx = from.x + from.width / 2 + offset;
  const sy = from.y + from.height;
  const tx = to.x + to.width / 2 + offset;
  const ty = to.y;
  if (Math.abs(sx - tx) < 1) return `M ${sx} ${sy} L ${tx} ${ty}`;
  const midY = sy + (ty - sy) / 2;
  return `M ${sx} ${sy} V ${midY} H ${tx} V ${ty}`;
}

function NodeChrome({ node, color }: { node: LaidOutNode; color?: string }) {
  const tintStyle = color
    ? { borderColor: hexToRgba(color, 0.55), backgroundColor: hexToRgba(color, 0.08) }
    : undefined;

  const inner = (
    <div className="flex h-full w-full flex-col items-center justify-center gap-1 px-2.5 text-center">
      <p
        className={
          node.shape === "start" || node.shape === "end"
            ? "font-mono text-[10px] uppercase tracking-wider text-foreground"
            : "text-[11px] font-semibold leading-snug text-foreground"
        }
      >
        {node.label}
      </p>
      {node.detail && (
        <p className="text-[9px] leading-snug text-muted">{node.detail}</p>
      )}
      {node.tech && node.tech.length > 0 && (
        <div className="mt-0.5 flex flex-wrap justify-center gap-1">
          {node.tech.map((t) => (
            <span
              key={t}
              className="rounded-full border border-surface-border px-1.5 py-0.5 font-mono text-[8px] text-muted"
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );

  if (node.shape === "start" || node.shape === "end") {
    const tone =
      node.shape === "start"
        ? "border-accent/50 bg-accent/10"
        : "border-accent-2/50 bg-accent-2/10";
    return <div className={`h-full w-full rounded-full border ${tone}`}>{inner}</div>;
  }

  if (node.shape === "decision") {
    return (
      <div
        className="h-full w-full border border-accent/40 bg-surface"
        style={{ clipPath: "polygon(50% 2%, 98% 50%, 50% 98%, 2% 50%)", ...tintStyle }}
      >
        {inner}
      </div>
    );
  }

  if (node.shape === "io") {
    return (
      <div
        className="h-full w-full border border-surface-border bg-surface/80"
        style={{ clipPath: "polygon(10% 0, 100% 0, 90% 100%, 0 100%)", ...tintStyle }}
      >
        {inner}
      </div>
    );
  }

  return (
    <div className="h-full w-full rounded-xl border border-surface-border bg-surface" style={tintStyle}>
      {inner}
    </div>
  );
}

export default function ArchitectureDiagram({ flow }: { flow: Flowchart }) {
  const { laidOut, svgWidth, svgHeight } = layout(flow);

  const colorOf = new Map<string, string>();
  flow.clusters?.forEach((cluster) => {
    cluster.nodeIds.forEach((id) => colorOf.set(id, cluster.color));
  });

  const clusterBoxes = (flow.clusters ?? []).flatMap((cluster) => {
    const members = cluster.nodeIds
      .map((id) => laidOut.get(id))
      .filter((n): n is LaidOutNode => Boolean(n));
    if (members.length === 0) return [];
    return clusterRuns(members).map((run, runIndex) => {
      const minX = Math.min(...run.map((n) => n.x)) - CLUSTER_PAD;
      const minY = Math.min(...run.map((n) => n.y)) - CLUSTER_PAD;
      const maxX = Math.max(...run.map((n) => n.x + n.width)) + CLUSTER_PAD;
      const maxY = Math.max(...run.map((n) => n.y + n.height)) + CLUSTER_PAD;
      return {
        ...cluster,
        id: `${cluster.id}-${runIndex}`,
        x: minX,
        y: minY,
        width: maxX - minX,
        height: maxY - minY,
      };
    });
  });

  return (
    <div className="overflow-x-auto pb-2">
      <div
        className="relative"
        style={{ width: svgWidth, height: svgHeight, minWidth: svgWidth }}
      >
        {clusterBoxes.map(
          (box) =>
            box && (
              <div
                key={box.id}
                className="absolute rounded-2xl border"
                style={{
                  left: box.x,
                  top: box.y,
                  width: box.width,
                  height: box.height,
                  borderColor: hexToRgba(box.color, 0.3),
                  backgroundColor: hexToRgba(box.color, 0.04),
                }}
              >
                <span
                  className="absolute -top-2.5 left-3 rounded-full px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider"
                  style={{
                    backgroundColor: "var(--background)",
                    color: box.color,
                    border: `1px solid ${hexToRgba(box.color, 0.4)}`,
                  }}
                >
                  {box.label}
                </span>
              </div>
            ),
        )}
        <svg
          width={svgWidth}
          height={svgHeight}
          className="absolute inset-0"
          style={{ pointerEvents: "none" }}
        >
          <defs>
            <marker
              id="flow-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M0,0 L10,5 L0,10 z" fill={ARROW_COLOR} />
            </marker>
          </defs>
          {flow.edges.map((edge, i) => {
            const from = laidOut.get(edge.from);
            const to = laidOut.get(edge.to);
            if (!from || !to) return null;
            const parallelCount = flow.edges.filter(
              (e) => e.from === from.id && e.to === to.id,
            ).length;
            const sameIndex = flow.edges
              .filter((e) => e.from === from.id && e.to === to.id)
              .indexOf(edge);
            const offset =
              parallelCount > 1 ? (sameIndex - (parallelCount - 1) / 2) * 14 : 0;
            const d = edgePath(from, to, offset);
            const midX = (from.x + from.width / 2 + to.x + to.width / 2) / 2 + offset;
            const midY = from.y + from.height + (to.y - (from.y + from.height)) / 2;
            return (
              <g key={`${edge.from}-${edge.to}-${i}`}>
                <path
                  d={d}
                  fill="none"
                  stroke={LINE_COLOR}
                  strokeWidth={1.4}
                  markerEnd="url(#flow-arrow)"
                />
                {edge.label && (
                  <foreignObject x={midX - 55} y={midY - 9} width={110} height={18}>
                    <div className="flex h-full items-center justify-center">
                      <span className="whitespace-nowrap rounded-full bg-background px-1.5 py-0.5 font-mono text-[8px] text-accent">
                        {edge.label}
                      </span>
                    </div>
                  </foreignObject>
                )}
              </g>
            );
          })}
        </svg>
        {Array.from(laidOut.values()).map((node) => (
          <div
            key={node.id}
            className="absolute"
            style={{ left: node.x, top: node.y, width: node.width, height: node.height }}
          >
            <NodeChrome node={node} color={colorOf.get(node.id)} />
          </div>
        ))}
      </div>
    </div>
  );
}
