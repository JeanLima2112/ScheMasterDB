import { Flex, Text } from "@chakra-ui/react";
import { Handle, Position } from "@xyflow/react";

export default function NodeCustom({data}:any) {
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
          {data.label ? `${data.label}`: 'Entity'}
        </Text>
      </Flex>

      <Handle id="connection-left" type="target"  style={{ width: 10, height: 10, borderRadius: 0, background: "white", border: "1px solid" }} position={Position.Left} />
      <Handle id="connection-right" type="source"  style={{ width: 10, height: 10, borderRadius: 50, background: "red", border: "1px solid" }} position={Position.Right} />

    </Flex>
  );
}
