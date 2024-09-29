import { Flex, Text } from "@chakra-ui/react";
import { BaseEdge, EdgeProps, getStraightPath } from "@xyflow/react";

const CustomEdge = ({id, sourceX, sourceY, targetX, targetY}: EdgeProps) => {
  const [edgePath] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{ stroke: "#000", strokeWidth: 2 }}
      />

    </>
  );
};

export default CustomEdge;
