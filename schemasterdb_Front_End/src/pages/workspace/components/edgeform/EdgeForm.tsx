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
  Select,
} from "@chakra-ui/react";
import { MyEdgeProps } from "./type";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

interface Props {
  onEdgeClose: () => void;
  isEdgeOpen: boolean;
  edgeUpdate: any;
  edges: any;
  setEdges: (values: any) => void;
}

export default function EdgeForm({
  onEdgeClose,
  isEdgeOpen,
  edgeUpdate,
  setEdges,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MyEdgeProps>();

  useEffect(() => {
    if (edgeUpdate) {
      reset({ label: edgeUpdate.label });
    }
  }, [edgeUpdate, reset]);

  function save(data: MyEdgeProps) {
    const newEdgeId = edgeUpdate.id;

    setEdges((edges: any) =>
      edges.map((edge: any) =>
        edge.id === newEdgeId
          ? {
              ...edge,
              label: data.label,
              data: { type: data.type },
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

          <FormControl mt={5} isInvalid={!!errors.type}>
            <FormLabel>Cardinalidade</FormLabel>
            <Select
              placeholder="Selecione a cardinalidade"
              {...register("type", {
                required: "A cardinalidade é obrigatória",
              })}
            >
              <option value="1 - *">Um para Muitos</option>
              <option value="* - *">Muitos para Muitos</option>
              <option value="1 - 1">Um para Um</option>
            </Select>
            {errors.type && (
              <FormErrorMessage>{errors.type.message}</FormErrorMessage>
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
