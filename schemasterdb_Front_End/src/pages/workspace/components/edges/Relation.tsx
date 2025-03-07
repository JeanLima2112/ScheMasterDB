import { BaseEdge, EdgeProps, getStraightPath } from "@xyflow/react";

const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  label,
  data,
}: EdgeProps) => {
  const [edgePath] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const midX = (sourceX + targetX) / 2;
  const midY = (sourceY + targetY) / 2;

  const diamondWidth = 150;
  const diamondHeight = 80;

  const diamondPath = `
    M ${midX},${midY - diamondHeight / 2} 
    L ${midX + diamondWidth / 2},${midY} 
    L ${midX},${midY + diamondHeight / 2} 
    L ${midX - diamondWidth / 2},${midY} 
    Z
  `;

  const squarePath = `
   M ${midX - diamondWidth / 2},${midY - diamondHeight / 2}
    L ${midX + diamondWidth / 2},${midY - diamondHeight / 2}
    L ${midX + diamondWidth / 2},${midY + diamondHeight / 2}
    L ${midX - diamondWidth / 2},${midY + diamondHeight / 2}
    Z
  `;

  const edgeLabel = data?.type ? data.type.toString() : "?";

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{ stroke: "#000", strokeWidth: 2 }}
      />

      {data?.type === "* - *" && (
        <path d={squarePath} fill="none" stroke="#000" strokeWidth={2} />
      )}

      <path d={diamondPath} fill="#fff" stroke="#000" strokeWidth={2} />
      <text
        x={midX}
        y={midY}
        textAnchor="middle"
        alignmentBaseline="central"
        style={{
          fontSize: 18,
          fill: "#000",
          fontWeight: "bold",
          userSelect: "none",
        }}
      >
        <tspan x={midX} dy="0em">
          {label}
        </tspan>
        <tspan x={midX} dy="1.2em">
          {edgeLabel}
        </tspan>
      </text>
    </>
  );
};

export default CustomEdge;
