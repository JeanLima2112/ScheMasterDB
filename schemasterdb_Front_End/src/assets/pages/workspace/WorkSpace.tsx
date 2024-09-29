import {
  Button,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  Flex,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import {
  addEdge,
  Background,
  Controls,
  Edge,
  Node,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import { useCallback } from "react";

import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";

import "@xyflow/react/dist/style.css";
import Header from "../../../components/header/Header";
import CustomEdge from "./components/edges/Relation";
import NodeCustom from "./components/nodes/Node";

const NODE_TYPES = {
  node: NodeCustom,
};
const EDGE_TYPES = {
  edge: CustomEdge,
};
const defaultEdgeOptions = {
  type: "edge",
};
const initialNodes:Node[] = [
  
];
const initialEdges:Edge[] = [];

export default function WorkSpace() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const containerBounds = event.target.getBoundingClientRect();

      const dropPosition = {
        x: event.clientX - containerBounds.left,
        y: event.clientY - containerBounds.top,
      };
      const nodeId = crypto.randomUUID();
      setNodes((existingNodes) => [
        ...existingNodes,
        {
          id: nodeId,
          type: "node",
          position: dropPosition,
          data: { label: `Node ${nodeId}` },
        },
      ]);
    },
    [setNodes]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <Flex w="100dvw" h="100dvh" direction="column">
      <Header />
      <Flex w="100dvw" h="94dvh">
        <Flex
          w="10dvw"
          h="94dvh"
          borderRight="1px solid black"
          bg="#f6f6f6"
          alignItems="center"
          p="1rem"
          direction="column"
          gap="1rem"
        >
          <Flex
            w="130px"
            h="fit-content"
            minH="4rem"
            p=".3rem"
            alignItems="center"
            justifyContent="center"
            cursor="grab"
            draggable
          >
            <Image
              src="src\assets\elements\Entity-removebg-preview.png"
              alt="Dan Abramov"
            />
          </Flex>
        </Flex>
        <Flex w="85dvw" h="94dvh">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={NODE_TYPES}
            edgeTypes={EDGE_TYPES}
            defaultEdgeOptions={defaultEdgeOptions}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            attributionPosition="bottom-right"
          >
            <Controls />
            <Background gap={12} size={1} />
          </ReactFlow>
          <Flex></Flex>
          <Button
            position="absolute"
            top="10%"
            right="0%"
            onClick={onOpen}
            bg="gray.600"
            color="white"
            borderRadius="0 5px 5px 0"
          >
            <MdOutlineKeyboardDoubleArrowLeft />
          </Button>
          <Drawer size="sm" placement="right" onClose={onClose} isOpen={isOpen}>
            <DrawerContent>
              <DrawerCloseButton />
              <Flex justifyContent="center">
                <DrawerHeader>Edit Atributes</DrawerHeader>
              </Flex>
            </DrawerContent>
          </Drawer>
        </Flex>
      </Flex>
    </Flex>
  );
}
