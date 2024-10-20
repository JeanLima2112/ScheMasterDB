import { extendTheme } from "@chakra-ui/react";

const colors = {
  primary: "#15242b", // Cor principal
  secondary: "#e56024", // Cor secundária
  accent: "#38A169", // Cor de destaque (verde suave)
  neutral: "#D69E2E", // Cor neutra (dourado suave)
  tertiary1: "#4A5568", // Terciária 1 (cinza-azulado escuro)
  tertiary2: "#2C7A7B", // Terciária 2 (azul-esverdeado profundo)
  background: "#d4d4d4", // Fundo
  text: '#ffff'
};

const theme = extendTheme({ colors });

export default theme;
