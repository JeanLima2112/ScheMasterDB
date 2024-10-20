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
  Fade,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { IoEnterSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import axios from "axios";
import { UserCreate } from "../types/type";
import { setToken } from "../../../auth/Auth";
import Header from "../../../components/header/Header";
import { useEffect, useState } from "react";

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

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
          gap="1rem"
          bg="white"
          p="4%"
          borderRadius="1rem"
          boxShadow="2xl"
          transform={isVisible ? "translateY(0)" : "translateY(20px)"} 
          opacity={isVisible ? 1 : 0} 
          transition="transform 0.5s ease, opacity 0.5s ease" 
        >
          <Flex direction="column" gap="1.5rem">
            <Text
              fontSize="2rem"
              fontWeight="bold"
              textAlign="center"
              color="primary"
            >
              Entre em sua conta
            </Text>

            <FormControl isInvalid={!!errors?.email}>
              <InputGroup color="secondary">
                <InputLeftElement pointerEvents="none">
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
            gap=".5rem"
            onClick={() => handleSubmit(onSignInSubmit)()}
          >
            <IoEnterSharp />
            Entrar
          </Button>

          <Text textAlign="start">
            Ainda não possui conta?{" "}
            <Link as={RouterLink} to="/signup" color="accent">
              Faça o seu cadastro
            </Link>
          </Text>
        </Flex>
      </Fade>
    </Flex>
  );
}
