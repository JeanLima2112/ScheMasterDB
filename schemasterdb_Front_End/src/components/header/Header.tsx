import { Flex, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
  return (
    <Flex
      bg="primary"
      color="white"
      justifyContent="space-between"
      width="100%"
      zIndex="1000"
    >
      <Flex 
      w="4rem" 
      alignItems="center" 
      cursor="pointer" 
      onClick={() => navigate("/")}
    >
      <Image src="src/assets/logo/favicon/android-chrome-192x192.png" />
      <Text fontSize="1.5rem" color="secondary">
        ScheMasterDB
      </Text>
    </Flex>
    </Flex>
  );
}
