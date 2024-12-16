import {
  Flex,
  Button,
  Container,
  Heading,
  Stack,
  Text,
  Link as ChakraLink,
  Image,
  Grid,
  Box,
  Icon,
} from "@chakra-ui/react";
import { FiDatabase, FiUsers, FiMonitor } from "react-icons/fi";

export default function LandingPage() {
  return (
    <Flex direction="column" minH="100vh" bg="background">

      <Flex
        bg="primary"
        color="text"
        px="1.5rem"
        py="1rem"
        align="center"
        justify="space-between"
        boxShadow="md"
        position="fixed"
        top="0"
        w="100%"
        zIndex="1000"
      >
        <Flex align="center">
          <Image
            src="src/assets/logo/favicon/android-chrome-192x192.png"
            boxSize="40px"
            mr="1rem"
          />
          <Text fontSize="1.5rem" fontWeight="bold" color="secondary">
            ScheMasterDB
          </Text>
        </Flex>

  
        <Stack direction="row" spacing="1.5rem" display={{ base: "none", md: "flex" }}>
          <ChakraLink
            href="#home"
            fontSize="1rem"
            fontWeight="medium"
            color="text"
            textDecoration="none"
            _hover={{ color: "secondary", textDecoration: "none" }}
          >
            Início
          </ChakraLink>
          <ChakraLink
            href="#features"
            fontSize="1rem"
            fontWeight="medium"
            color="text"
            textDecoration="none"
            _hover={{ color: "secondary", textDecoration: "none" }}
          >
            Funcionalidades
          </ChakraLink>
          <ChakraLink
            href="#about"
            fontSize="1rem"
            fontWeight="medium"
            color="text"
            textDecoration="none"
            _hover={{ color: "secondary", textDecoration: "none" }}
          >
            Sobre
          </ChakraLink>
        </Stack>

 
        <Stack direction="row" spacing="1rem" alignItems="center">
          <Button as={ChakraLink} href="/login" bg="accent" color="text" variant="outline" size="sm">
            Login
          </Button>
          <Button as={ChakraLink} href="/signup" bg="secondary" color="text" variant="solid" size="sm">
            Cadastre-se
          </Button>
        </Stack>
      </Flex>

 
      <Flex
        id="home"
        mt="80px" 
        flex="1"
        direction="column"
        align="center"
        justify="center"
        py={20}
        bg="linear-gradient(180deg, rgba(21,36,43,0.1) 0%, rgba(229,96,36,0.1) 100%)"
      >
        <Container maxW="container.xl" textAlign="center">
          <Heading size="2xl" mb={6} color="primary" fontWeight="extrabold">
            Sistema de Modelagem de Banco de Dados
          </Heading>
          <Text fontSize="xl" mb={6} color="tertiary1">
            Facilite o desenvolvimento do seu banco de dados com nosso sistema
            de modelagem intuitivo e completo.
          </Text>

          <Stack direction="row" spacing={4} justify="center">
            <Button as={ChakraLink} href="/login" bg="accent" color="text" size="lg">
              Login
            </Button>
            <Button as={ChakraLink} href="/signup" bg="secondary" color="text" variant="outline" size="lg">
              Cadastro
            </Button>
          </Stack>
        </Container>
      </Flex>

  
      <Flex id="features" bg="white" py={20} mt={20} justify="center">
        <Container maxW="container.xl">
          <Heading size="xl" mb={10} textAlign="center" color="neutral">
            Funcionalidades
          </Heading>
          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
            <Box textAlign="center" p={5} borderRadius="lg" boxShadow="md" bg="background">
              <Icon as={FiDatabase} w={12} h={12} color="primary" mb={4} />
              <Heading size="md" mb={2} color="neutral">
                Modelagem Visual
              </Heading>
              <Text color="tertiary2">
                Crie diagramas de banco de dados com facilidade e exporte em
                diversos formatos.
              </Text>
            </Box>
            <Box textAlign="center" p={5} borderRadius="lg" boxShadow="md" bg="background">
              <Icon as={FiUsers} w={12} h={12} color="primary" mb={4} />
              <Heading size="md" mb={2} color="neutral">
                Colaboração
              </Heading>
              <Text color="tertiary2">
                Trabalhe em equipe em tempo real com nosso sistema de
                compartilhamento.
              </Text>
            </Box>
            <Box textAlign="center" p={5} borderRadius="lg" boxShadow="md" bg="background">
              <Icon as={FiMonitor} w={12} h={12} color="primary" mb={4} />
              <Heading size="md" mb={2} color="neutral">
                Integração
              </Heading>
              <Text color="tertiary2">
                Conecte com as principais ferramentas de desenvolvimento.
              </Text>
            </Box>
          </Grid>
        </Container>
      </Flex>

    
      <Flex id="about" bg="gray.50" py={20} mt={20} justify="center">
        <Container maxW="container.xl" textAlign="center">
          <Heading size="xl" mb={6} color="neutral">
            Sobre Nós
          </Heading>
          <Text fontSize="lg" mb={6} color="tertiary1">
            Somos uma equipe dedicada a fornecer soluções eficientes para o
            desenvolvimento de bancos de dados.
          </Text>
        </Container>
      </Flex>
    </Flex>
  );
}
