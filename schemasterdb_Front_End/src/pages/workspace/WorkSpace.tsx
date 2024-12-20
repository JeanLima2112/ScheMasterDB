import { Button, Flex, Image, useDisclosure } from "@chakra-ui/react";
import {
  addEdge,
  Background,
  Controls,
  Edge,
  Node,
  ReactFlow,
  useEdgesState,
  useNodesState
} from "@xyflow/react";
import { useCallback, useState } from "react";
import "./style.scss";

import "@xyflow/react/dist/style.css";
import Header from "../../components/header/Header";
import EdgeForm from "./components/edgeform/EdgeForm";
import CustomEdge from "./components/edges/Relation";
import NodeForm from "./components/nodeform/NodeForm";
import NodeCustom from "./components/nodes/Node";
import { FaSave } from "react-icons/fa";

const NODE_TYPES = {
  node: NodeCustom,
};
const EDGE_TYPES = {
  edge: CustomEdge,
};
const defaultEdgeOptions = {
  type: "edge",
  label: "Relation",
  data: {type: "?"},
  // animated: true,
};
const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

export default function WorkSpace() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodeUpdate, setNodeUpdate] = useState<Node>();
  const [edgeUpdate, setEdgeUpdate] = useState<Edge>();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isEdgeOpen,
    onOpen: onEdgeOpen,
    onClose: onEdgeClose,
  } = useDisclosure();

  const onDrop = useCallback(
    (event : any) => {
      event.preventDefault();

      const containerBounds = event.target.getBoundingClientRect();

      const dropPosition = {
        x: event.clientX - containerBounds.left,
        y: event.clientY - containerBounds.top,
      };
      const id = crypto.randomUUID();
      setNodes((existingNodes) => [
        ...existingNodes,
        {
          id,
          type: "node",
          position: dropPosition,
          data: { label: "Entity" },
        },
      ]);
    },
    [setNodes]
  );

  const onDragOver = useCallback((event : any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onConnect = useCallback((params : any) => {
    const newEdge = {
      ...params,
      id: crypto.randomUUID(),
    };
    setEdges((eds) => addEdge(newEdge, eds));
  }, []);
  const onNodesDoubleClick = (event: React.MouseEvent, node: Node) => {
    setNodeUpdate(node);
    onOpen();
  };

  const onEdgeDoubleClick = (event: React.MouseEvent, edge: Edge) => {
    setEdgeUpdate(edge);
    onEdgeOpen();
  };

  const saveFlow =() => {
    alert('Salvar Flow')
  }
  // const saveFlow = useCallback(async () => {
  //   const data = {
  //     user_id: getUserID(),
  //     id,
  //     title,
  //     nodes,
  //     edges,
  //     viewport: {
  //       x: 0,
  //       y: 0,
  //       zoom: 1,
  //     },
  //   };
  //   console.log(data);
  //   try {
  //     const response = await axios.put(
  //       `http://localhost:3000/template/${id}`,
  //       data,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${getToken()}`,
  //         },
  //       }
  //     );
  //     if (response.status === 200) {
  //       console.log("Flow saved successfully");
  //       window.location.reload();
  //     }
  //   } catch (error) {
  //     console.error("Error saving flow", error);
  //   }
  // }, [id, title, nodes, edges]);

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
              src="src\elements\Entity-removebg-preview.png"
              alt="Entity gadget"
            />
          </Flex>
        </Flex>
        <Flex w="95dvw" h="94dvh">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={NODE_TYPES}
            edgeTypes={EDGE_TYPES}
            defaultEdgeOptions={defaultEdgeOptions}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeDoubleClick={onNodesDoubleClick}
            onEdgeDoubleClick={onEdgeDoubleClick}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
          >
            <Controls className="custom-controls" />
            <Background gap={12} size={1} />
          </ReactFlow>
          <Button
      position="absolute"
      top="20%"
      right="94%"
      onClick={saveFlow}
      color="white" 
      backgroundColor="#4CAF50" 
      borderRadius="5px"
      fontSize="1.2rem"
      padding="10px 15px"
      boxShadow="0 4px 8px rgba(0, 0, 0, 0.2)" 
      transition="background-color 0.3s, transform 0.3s" 
      _hover={{
        backgroundColor: "#45a049",
        transform: "scale(1.05)", 
      }}
      _active={{
        transform: "scale(0.95)", 
      }}
    >
      <FaSave />
    </Button>
          <NodeForm
            onClose={onClose}
            isOpen={isOpen}
            nodes={nodes}
            nodeUpdate={nodeUpdate}
            setNodes={setNodes}
          />
          <EdgeForm
            isEdgeOpen={isEdgeOpen}
            onEdgeClose={onEdgeClose}
            edges={edges}
            setEdges={setEdges}
            edgeUpdate={edgeUpdate}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
