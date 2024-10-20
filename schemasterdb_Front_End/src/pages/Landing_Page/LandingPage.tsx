import {
  Flex,
  Button,
  Container,
  Heading,
  Stack,
  Text,
  Link,
  Image,
} from "@chakra-ui/react";

const LandingPage = () => {
  return (
    <Flex direction="column" minH="100vh">
      <Flex
  bg="primary"
  color="white"
  px="1rem"
  py="0.5rem"
  justifyContent="space-between"
  width="100%"
  zIndex="1000"
>
  <Flex w="4rem" alignItems='center'>
    <Image src="src\assets\logo\favicon\android-chrome-192x192.png" />
    <Text fontSize='1.5rem' color='secondary'>ScheMasterDB</Text>
  </Flex>

 <Stack direction="row" spacing="1.5rem" alignItems="center">
  <Link
    href="#features"
    fontSize="1rem"
    fontWeight="medium"
    color="white"
    textDecoration="none"
    _hover={{ color: "secondary", textDecoration: "none" }}
  >
    Inicio
  </Link>
  <Link
    href="#about"
    fontSize="1rem"
    fontWeight="medium"
    color="white"
    textDecoration="none"
    _hover={{ color: "secondary", textDecoration: "none" }}
  >
    Funcionalidades
  </Link>
  <Link
    href="#about"
    fontSize="1rem"
    fontWeight="medium"
    color="white"
    textDecoration="none"
    _hover={{ color: "secondary", textDecoration: "none" }}
  >
    Veja
  </Link>
  <Link
    href="#about"
    fontSize="1rem"
    fontWeight="medium"
    color="white"
    textDecoration="none"
    _hover={{ color: "secondary", textDecoration: "none" }}
  >
    Sobre
  </Link>
</Stack>

  <Stack direction="row" spacing="1rem" alignItems="center">
    <Button bg="accent" color="white" variant="outline" size="sm">
      Login
    </Button>
    <Button bg="secondary" color="white" variant="solid" size="sm">
      Cadastre-se
    </Button>
  </Stack>
</Flex>


      <Flex
        mt="80px"
        flex="1"
        direction="column"
        align="center"
        justify="center"
        py={20}
      >
        <Container maxW="container.xl">
          <Flex direction="column" textAlign="center">
            <Heading  size="2xl" mb={6} color="primary">
              Sistema de Modelagem de Banco de Dados
            </Heading>
            <Text fontSize="xl" mb={6} color="tertiary1">
              Facilite o desenvolvimento do seu banco de dados com nosso sistema
              de modelagem intuitivo e completo.
            </Text>

            <Stack direction="row" spacing={4} justify="center">
              <Button bg="accent" color="white" size="lg">
                Login
              </Button>
              <Button bg="secondary" color="white" variant="outline" size="lg">
                Cadastro
              </Button>
            </Stack>
          </Flex>
        </Container>
      </Flex>

      <Flex id="features" bg="white" py={20} justify="center">
        <Container maxW="container.xl">
          <Heading  size="xl" mb={6} textAlign="center" color="neutral">
            Funcionalidades
          </Heading>
          <Text fontSize="lg" textAlign="center" color="tertiary2">
            Explore as funcionalidades do nosso sistema para simplificar a
            modelagem de bancos de dados.
          </Text>
        </Container>
      </Flex>

      <Flex id="about" bg="gray.50" py={20} justify="center">
        <Container maxW="container.xl">
          <Heading  size="xl" mb={6} textAlign="center" color="neutral">
            Sobre Nós
          </Heading>
          <Text fontSize="lg" textAlign="center" color="tertiary1">
            Somos uma equipe dedicada a fornecer soluções eficientes para o
            desenvolvimento de bancos de dados.
          </Text>
        </Container>
      </Flex>
    </Flex>
  );
};

export default LandingPage;
