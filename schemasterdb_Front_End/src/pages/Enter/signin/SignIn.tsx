import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { IoEnterSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import axios from "axios";
import { UserCreate } from "../types/type";
import { setToken } from "../../../auth/Auth";

export default function AuthPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserCreate>();

  const navigate = useNavigate();

  const onSignInSubmit = (data: UserCreate) => {
    console.log(data);
    axios
      .post("http://localhost:3000/auth/login", data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setToken(response.data.token);
        navigate("/projects");
      })
      .catch(() => {
        alert("Ocorreu algum erro ao Entrar");
      });
  };

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      minH="100vh"
      direction="column"
      gap="1rem"
      bg="#d4d4d4" // Você pode usar uma cor padrão aqui ou definir uma variável de cor
    >
      <Flex
        direction="column"
        minW="40rem"
        gap="2rem"
        bg="white"
        p="2%"
        borderRadius="1rem"
        boxShadow="md" // Adicione uma sombra para dar mais profundidade
      >
        <Flex direction="column" gap="1.5rem">
          <Text fontSize="2xl" fontWeight="bold" textAlign="center" color="primary">
            Entre em sua conta
          </Text>

          <FormControl isInvalid={!!errors?.email}>
            <InputGroup color="secondary">
              <InputLeftElement  pointerEvents="none">
                <MdEmail />
              </InputLeftElement>
              <Input
                placeholder="Email"
                type="email"
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

          <FormControl isInvalid={!!errors?.password}>
            <InputGroup color="secondary">
              <InputLeftElement pointerEvents="none">
                <RiLockPasswordFill />
              </InputLeftElement>
              <Input
                placeholder="Senha"
                type="password"
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
        </Flex>

        <Button
          bg="secondary" 
          color="text"
          variant="solid"
          w="100%"
          mt="2rem"
          gap=".5rem"
          onClick={() => handleSubmit(onSignInSubmit)()}
        >
          <IoEnterSharp />
          Entrar
        </Button>

        <Text textAlign="start">
          Ainda não possui conta?{" "}
          <Link as={RouterLink} to="/singup" color="accent">
            Faça o seu cadastro
          </Link>
        </Text>
      </Flex>
    </Flex>
  );
}
