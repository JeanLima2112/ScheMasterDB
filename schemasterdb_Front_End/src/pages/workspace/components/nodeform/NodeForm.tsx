import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { NodeProps } from "./type";

interface Props {
  onClose: () => void;
  isOpen: boolean;
  nodeUpdate: any;
  nodes: any;
  setNodes: (values: any) => void;
}

export default function NodeForm({
  onClose,
  isOpen,
  nodeUpdate,
  setNodes,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NodeProps>();

  useEffect(() => {
    if (nodeUpdate) {
      reset(nodeUpdate.data);
    }
  }, [nodeUpdate, reset]);

  const save = (data: any) => {
    const id = nodeUpdate.id;

    setNodes((nodes: any) =>
      nodes.map((node: any) =>
        node.id === id
          ? {
              ...node,
              data: {
                ...node.data,
                label: data.label,
              },
            }
          : node
      )
    );

    reset();
    onClose();
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Edit Entity</DrawerHeader>

        <DrawerBody>
          <FormControl isInvalid={!!errors.label}>
            <FormLabel>Label</FormLabel>
            <Input
              {...register("label", {
                required: "Label is required",
                minLength: {
                  value: 3,
                  message: "Label must be at least 3 characters long",
                },
              })}
            />
            {errors.label && (
              <FormErrorMessage>{errors.label.message}</FormErrorMessage>
            )}
          </FormControl>
          <Button
          mt={10}
            colorScheme="blue" 
            width="100%"       
            onClick={handleSubmit(save)}
          >
            Save
          </Button>
        </DrawerBody>

     

          
      
      </DrawerContent>
    </Drawer>
  );
}
