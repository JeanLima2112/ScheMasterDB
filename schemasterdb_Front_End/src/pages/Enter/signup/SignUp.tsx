import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Text,
  Fade,
} from "@chakra-ui/react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import { GoCheckbox } from "react-icons/go";
import { IoMdPersonAdd } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { setToken } from "../../../auth/Auth";
import Header from "../../../components/header/Header";
import { UserCreate } from "../types/type";
import { useEffect, useState } from "react";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<UserCreate>();
  const watchPassword = watch("password");
  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const onSignUpSubmit = (data: UserCreate) => {
    console.log(data);
    axios
      .post("http://localhost:3000/user", data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        if (response.status === 201) {
          axios
            .post("http://localhost:3000/auth/login", data, {
              headers: { "Content-Type": "application/json" },
            })
            .then((response) => {
              setToken(response.data.token);
              navigate("/projects");
            })
            .catch(() => {
              alert("Erro na Autenticação do Usuario!");
            });
        }
      })
      .catch(() => {
        alert("Erro Na Criação do Usuario!");
      });
  };

  return (
    <Flex
      alignItems="center"
      minH="100vh"
      direction="column"
      gap="1rem"
      bgImage="url('./src/assets/background/cornered-stairs.svg')"
      bgSize="cover"
    >
      <Header />
      <Fade in={isVisible}>
        <Flex
          direction="column"
          minW="40rem"
          bg="text"
          px="5%"
          pb="2%"
          borderRadius="1rem"
          boxShadow="2xl"
          transform={isVisible ? "translateY(0)" : "translateY(20px)"} 
          opacity={isVisible ? 1 : 0} 
          transition="transform 0.5s ease, opacity 0.5s ease" 
        >
          <Flex justifyContent="center">
            <Text
              fontSize="2rem"
              fontWeight="bold"
              textAlign="center"
              mb="1rem"
              color="primary"
            >
              Cadastre-se
            </Text>
          </Flex>

          <Flex direction="column" gap="1rem">
            <FormControl isInvalid={!!errors?.email}>
              <InputGroup>
                <InputLeftElement color="secondary" pointerEvents="none">
                  <MdEmail />
                </InputLeftElement>
                <Input
                  placeholder="Email"
                  type="email"
                  color="text"
                  focusBorderColor="accent"
                  {...register("email", {
                    required: "Email é obrigatório",
                    minLength: {
                      value: 3,
                      message: "Email deve ter pelo menos 3 caracteres",
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Digite um email válido",
                    },
                  })}
                />
              </InputGroup>
              {errors?.email && (
                <FormErrorMessage>{errors.email.message}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={!!errors?.username}>
              <InputGroup>
                <InputLeftElement color="secondary" pointerEvents="none">
                  <FaUser />
                </InputLeftElement>
                <Input
                  placeholder="Nome de usuário"
                  type="text"
                  color="text"
                  focusBorderColor="accent"
                  {...register("username", {
                    required: "Nome de usuário é obrigatório",
                    minLength: {
                      value: 3,
                      message: "Nome de usuário deve ter pelo menos 3 caracteres",
                    },
                  })}
                />
              </InputGroup>
              {errors?.username && (
                <FormErrorMessage>{errors.username.message}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={!!errors?.password}>
              <InputGroup>
                <InputLeftElement color="secondary" pointerEvents="none">
                  <RiLockPasswordFill />
                </InputLeftElement>
                <Input
                  placeholder="Senha"
                  type="password"
                  color="text"
                  focusBorderColor="accent"
                  {...register("password", {
                    required: "Senha é obrigatória",
                    minLength: {
                      value: 8,
                      message: "A senha deve ter pelo menos 8 caracteres",
                    },
                  })}
                />
              </InputGroup>
              {errors?.password && (
                <FormErrorMessage>{errors.password.message}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={!!errors?.passwordConfirmation}>
              <InputGroup>
                <InputLeftElement color="secondary" pointerEvents="none">
                  <GoCheckbox />
                </InputLeftElement>
                <Input
                  placeholder="Confirme a senha"
                  type="password"
                  color="text"
                  focusBorderColor="accent"
                  {...register("passwordConfirmation", {
                    required: "Confirmação de senha é obrigatória",
                    validate: (value) =>
                      value === watchPassword || "As senhas não coincidem",
                  })}
                />
              </InputGroup>
              {errors?.passwordConfirmation && (
                <FormErrorMessage>
                  {errors.passwordConfirmation.message}
                </FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={!!errors?.terms}>
              <Checkbox
                {...register("terms", {
                  required: "Aceitar os termos é obrigatório",
                })}
                colorScheme="secondary"
                iconColor="accent"
              >
                Li e aceito os{" "}
                <Link color="accent" href="/termos" isExternal>
                  termos e condições
                </Link>
              </Checkbox>
              {errors?.terms && (
                <FormErrorMessage>{errors.terms.message}</FormErrorMessage>
              )}
            </FormControl>
          </Flex>

          <Button
            bg="secondary"
            color="text"
            variant="solid"
            w="100%"
            mt="1rem"
            gap=".5rem"
            onClick={() => handleSubmit(onSignUpSubmit)()}
          >
            <IoMdPersonAdd />
            Criar Conta
          </Button>

          <Text textAlign="start">
            Já tem uma conta?{" "}
            <Link as={RouterLink} to="/login" color="accent">
              Faça login
            </Link>
          </Text>
        </Flex>
      </Fade>
    </Flex>
  );
}
