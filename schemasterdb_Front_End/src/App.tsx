import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import theme from "./colors/colors";
import Router from "./pages/Router";

export default function App() {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme} >
        <Router />
      </ChakraProvider>
    </BrowserRouter>
  );
}
