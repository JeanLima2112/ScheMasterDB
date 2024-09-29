import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

interface Props {
  onEdgeClose: () => void;
  isEdgeOpen: boolean;
}
export default function EdgeForm({ onEdgeClose, isEdgeOpen }: Props) {
  return (
    <Drawer isOpen={isEdgeOpen} onClose={onEdgeClose}>
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Edit Relation</DrawerHeader>

        <DrawerBody>
          <FormControl>
            <FormLabel>Label</FormLabel>
            <Input />
          </FormControl>
        </DrawerBody>

        <DrawerFooter>
          <Button type="submit">Save</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
