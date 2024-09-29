import { Flex, Text } from "@chakra-ui/react";
import { Handle, Position } from "@xyflow/react";

export default function Node() {
  return (
    <Flex
      w="fit-content"
      minW="200px"
      h="fit-content"
      alignItems='center'
      minH="4rem"
      color="#000"
      borderRadius='.2rem'
      p=".3rem"
      backgroundColor="#fbfbfb"
      border="2px solid #000"
    >
      <Flex
        fontSize="1.2rem"
        fontWeight="bold"
        gap="1rem"
        h="fit-content"
        color="black"
        alignItems="center"
        justifyContent="center"
        w="100%"
        direction="column"
      >
        <Text
          alignItems="center"
          w="100%"
          display="flex"
          justifyContent="center"
        >
          Name of Node
        </Text>
      </Flex>

      <Handle id="connection" type="target" position={Position.Left} />
      <Handle id="connection" type="source" position={Position.Right} />
    </Flex>
  );
}
