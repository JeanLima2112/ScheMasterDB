import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Link,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import { GoCheckbox } from "react-icons/go";
import { IoMdPersonAdd } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";

import { UserCreate } from "../types/type";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<UserCreate>();
  const watchPassword = watch("password");

  const onSignUpSubmit = (data: UserCreate) => {
    console.log(data);
    axios
      .post("http://localhost:3000/user", data, {
        headers: { "Content-Type": "application/json" },
      })
      // .then((response) => {
      //   if (response.status == 201) {
      //     axios
      //       .post("<Endereço>", data, {
      //         headers: { "Content-Type": "application/json" },
      //       })
      //       .then((response) => {
      //         const token = response.data.token;
      //         console.log(token);
      //       })
      //       .catch(() => {
      //         alert("Erro na Autenticação do Usuario!");
      //       });
      //   }
      // })
      .catch(() => {
        alert("Erro Na Criação do Usuario!");
      });
  };

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      minH="100vh"
      direction="column"
      gap="1rem"
      bg="#d4d4d4"
    >
      <Flex
        direction="column"
        minW="40rem"
        gap=".5rem"
        bg="#ffff"
        p="1%"
        borderRadius="1rem"
      >
        <Flex direction="column" gap="1.5rem">
          <Text fontSize="2xl" fontWeight="bold" textAlign="center">
            Criar Conta
          </Text>

          <FormControl isInvalid={!!errors?.email}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <MdEmail />
              </InputLeftElement>
              <Input
                placeholder="Email"
                type="email"
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
              <InputLeftElement pointerEvents="none">
                <FaUser />
              </InputLeftElement>
              <Input
                placeholder="Nome de usuário"
                type="text"
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
              <InputLeftElement pointerEvents="none">
                <RiLockPasswordFill />
              </InputLeftElement>
              <Input
                placeholder="Senha"
                type="password"
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
              <InputLeftElement pointerEvents="none">
                <GoCheckbox />
              </InputLeftElement>
              <Input
                placeholder="Confirme a senha"
                type="password"
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
            >
              Aceitar termos e condições
            </Checkbox>
            {errors?.terms && (
              <FormErrorMessage>{errors.terms.message}</FormErrorMessage>
            )}
          </FormControl>
        </Flex>

        <Button
          colorScheme="teal"
          variant="solid"
          w="100%"
          mt="2rem"
          gap=".5rem"
          onClick={() => handleSubmit(onSignUpSubmit)()}
        >
          <IoMdPersonAdd />
          Criar Conta
        </Button>

        <Text textAlign="start">
          Já tem uma conta?{" "}
          <Link as={RouterLink} to="/login" color="teal.500">
            Faça login
          </Link>
        </Text>
      </Flex>
    </Flex>
  );
}
