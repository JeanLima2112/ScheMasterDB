import { Route, Routes } from "react-router-dom";
import AuthPage from "./Enter/signin/SignIn";
import SignUp from "./Enter/signup/SignUp";
import WorkSpace from "./workspace/WorkSpace";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="workspace" element={<WorkSpace />} />
    </Routes>
  );
};

export default Router;
