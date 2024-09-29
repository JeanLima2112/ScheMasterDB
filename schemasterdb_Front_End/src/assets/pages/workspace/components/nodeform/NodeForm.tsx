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
    Input
} from "@chakra-ui/react";

interface Props {
  onClose: () => void;
  isOpen: boolean;
}
export default function NodeForm({onClose,isOpen}: Props) {
  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Edit Entity</DrawerHeader>

          <DrawerBody>
            <FormControl>
            <FormLabel>Label</FormLabel>
            <Input />
            </FormControl>
          </DrawerBody>

          <DrawerFooter>
            <Button type='submit'>
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
  );
}
