import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { CgProfile } from "react-icons/cg";
import { FaPlus } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import { useRef } from "react";

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <Flex direction="column">
      <Flex className="Header">
        <Flex
          w="100dvw"
          alignItems="center"
          fontSize="2rem"
          color="white"
          justifyContent="space-between"
          py=".5rem"
          px="2rem"
          borderBottom="1px solid black"
          bg="#353538"
        >
          <Flex cursor="pointer">
            <Menu isLazy>
              <MenuButton border="none" onClick={onOpen}>
                <CgProfile />
              </MenuButton>
            </Menu>
          </Flex>
        </Flex>
      </Flex>
      
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Perfil do Usuário</DrawerHeader>
          <DrawerBody>
            <Text fontSize="1.2rem">Nome do Usuário</Text>
            <Text fontSize="1rem" mt={2}>E-mail: usuario@example.com</Text>
            <Button 
              mt={4} 
              colorScheme="red" 
              leftIcon={<IoIosLogOut />} 
              onClick={() => {
                console.log("Logout");
              }}
            >
              Sair
            </Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Flex px="5%" py="3%" direction="column" gap="2rem">
        <Flex
          w="100%"
          justifyContent="space-between"
          borderBottom="3px solid black"
          p=".5rem"
          alignItems="center"
        >
          <Text fontSize="2rem">Modelos</Text>
          <Button
            gap="1rem"
            transition=".5s"
            alignItems="center"
            color="white"
            border="none"
            bg="#3d4752"
            _hover={{ bg: "#24a8d5" }}
          >
            <FaPlus /> Criar um Novo
          </Button>
        </Flex>
        <Flex className="here" wrap="wrap">
 
        </Flex>
      </Flex>
    </Flex>
  );
}
