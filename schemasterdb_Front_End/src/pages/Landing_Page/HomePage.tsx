import { Flex, Button, Container, Heading, Stack, Text, Link } from '@chakra-ui/react';

const LandingPage = () => {
  return (
    <Flex direction="column" bg="gray.100" minH="100vh">
      <Flex as="header" bg="blue.500" color="white" px={8} py={4} justify="center" position="fixed" width="100%" zIndex="1000">
        <Container maxW="container.xl">
          <Flex justify="space-between" align="center">
            <Heading as="h1" size="lg">
              ModelagemDB
            </Heading>
            <Stack direction="row" spacing={6}>
              <Link href="#features" fontSize="lg" fontWeight="medium">
                Funcionalidades
              </Link>
              <Link href="#about" fontSize="lg" fontWeight="medium">
                Sobre Nós
              </Link>
              <Link href="#contact" fontSize="lg" fontWeight="medium">
                Contato
              </Link>
            </Stack>
            <Stack direction="row" spacing={4}>
              <Button colorScheme="teal" variant="outline" size="sm">
                Login
              </Button>
              <Button colorScheme="teal" variant="solid" size="sm">
                Cadastro
              </Button>
            </Stack>
          </Flex>
        </Container>
      </Flex>

      <Flex mt="80px" as="main" flex="1" direction="column" align="center" justify="center" py={20}>
        <Container maxW="container.xl">
          <Flex direction="column" textAlign="center">
            <Heading as="h2" size="2xl" mb={6}>
              Sistema de Modelagem de Banco de Dados
            </Heading>
            <Text fontSize="xl" mb={6}>
              Facilite o desenvolvimento do seu banco de dados com nosso sistema de modelagem intuitivo e completo.
            </Text>

            <Stack direction="row" spacing={4} justify="center">
              <Button colorScheme="blue" variant="solid" size="lg">
                Login
              </Button>
              <Button colorScheme="teal" variant="outline" size="lg">
                Cadastro
              </Button>
            </Stack>
          </Flex>
        </Container>
      </Flex>

      {/* Seção Funcionalidades */}
      <Flex id="features" bg="white" py={20} justify="center">
        <Container maxW="container.xl">
          <Heading as="h2" size="xl" mb={6} textAlign="center">
            Funcionalidades
          </Heading>
          <Text fontSize="lg" textAlign="center">
            Explore as funcionalidades do nosso sistema para simplificar a modelagem de bancos de dados.
          </Text>
        </Container>
      </Flex>

      {/* Seção Sobre Nós */}
      <Flex id="about" bg="gray.50" py={20} justify="center">
        <Container maxW="container.xl">
          <Heading as="h2" size="xl" mb={6} textAlign="center">
            Sobre Nós
          </Heading>
          <Text fontSize="lg" textAlign="center">
            Somos uma equipe dedicada a fornecer soluções eficientes para o desenvolvimento de bancos de dados.
          </Text>
        </Container>
      </Flex>

      {/* Seção Contato */}
      <Flex id="contact" bg="white" py={20} justify="center">
        <Container maxW="container.xl">
          <Heading as="h2" size="xl" mb={6} textAlign="center">
            Contato
          </Heading>
          <Text fontSize="lg" textAlign="center">
            Entre em contato conosco para saber mais sobre nossos serviços e como podemos ajudar no seu projeto.
          </Text>
        </Container>
      </Flex>
    </Flex>
  );
};

export default LandingPage;
