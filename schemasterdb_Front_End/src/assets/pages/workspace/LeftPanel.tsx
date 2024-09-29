import { Flex, Image } from "@chakra-ui/react";

export default function LeftPanel() {
  return (
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
          src="src\assets\elements\Relation-removebg-preview.png"
          alt="Dan Abramov"
        />
      </Flex>
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
          src="src\assets\elements\Association-removebg-preview.png"
          alt="Dan Abramov"
        />
      </Flex>
    </Flex>
  );
}
