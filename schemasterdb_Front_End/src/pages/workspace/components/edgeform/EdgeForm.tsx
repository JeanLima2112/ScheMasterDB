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
import { EdgeProps } from "./type";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

interface Props {
  onEdgeClose: () => void;
  isEdgeOpen: boolean;
  edgeUpdate: any;
  edges: any;
  setEdges: (values: any) => void;
}

export default function EdgeForm({ onEdgeClose, isEdgeOpen,edgeUpdate,setEdges }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EdgeProps>();

  useEffect(() => {
    if (edgeUpdate) {
      reset({ label: edgeUpdate.label });
    }
  }, [edgeUpdate, reset]);

  function save(data: { label: string }) {
    console.log(edgeUpdate)
    const newEdgeId = edgeUpdate.id; 
  
    setEdges((edges: any) =>
      edges.map((edge: any) =>
        edge.id === newEdgeId
          ? {
              ...edge,
              label: data.label, 
            }
          : edge
      )
    );
  
    reset(); 
    onEdgeClose();
  }

  return (
    <Drawer isOpen={isEdgeOpen} onClose={onEdgeClose}>
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Edit Relation</DrawerHeader>

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
        </DrawerBody>

        <DrawerFooter>
          <Button onClick={handleSubmit(save)}>Save</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
