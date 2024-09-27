import {
  Button,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  Flex,
  Text,
  useDisclosure,
  Image 
} from "@chakra-ui/react";
import {
  addEdge,
  Background,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import { useCallback } from "react";

import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";

import "@xyflow/react/dist/style.css";
import Header from "../../../components/header/Header";

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

export default function WorkSpace() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <Flex w="100dvw" h="100dvh" direction="column">
      <Header />
      <Flex w="100dvw" h="94dvh">
        <Flex
          w="15dvw"
          h="94dvh"
          border="1px solid black"
          bg="#f6f6f6"
          borderRightRadius="2rem"
          alignItems="center"
          p="1rem"
          direction="column"
          gap="1rem"
        >
          <Flex
          w="150px"
          h="fit-content"
          minH="4rem"
          p=".3rem"
          alignItems="center"
          justifyContent="center"
          cursor="move"
          draggable
        >
           <Image src='src\assets\elements\Entity-removebg-preview.png' alt='Dan Abramov' />
        </Flex>
          <Flex
          w="150px"
          h="fit-content"
          minH="4rem"
          p=".3rem"
          alignItems="center"
          justifyContent="center"
          cursor="move"
          draggable
        >
           <Image src='src\assets\elements\Relation-removebg-preview.png' alt='Dan Abramov' />
        </Flex>
          <Flex
          w="150px"
          h="fit-content"
          minH="4rem"
          p=".3rem"
          alignItems="center"
          justifyContent="center"
          cursor="move"
          draggable
        >
           <Image src='src\assets\elements\Association-removebg-preview.png' alt='Dan Abramov' />
        </Flex>
        </Flex>
        <Flex w="85dvw" h="94dvh">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
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
          <Drawer size="md" placement="right" onClose={onClose} isOpen={isOpen}>
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
