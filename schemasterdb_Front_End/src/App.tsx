import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import Router from "./pages/Router";

export default function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <Router />
      </ChakraProvider>
    </BrowserRouter>
  );
}
