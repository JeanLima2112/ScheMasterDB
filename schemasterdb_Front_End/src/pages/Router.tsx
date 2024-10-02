import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import WorkSpace from "./workspace/WorkSpace";
import SignUp from "./Enter/signup/SignUp";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="workspace" element={<WorkSpace />} />
    </Routes>
  );
};

export default Router;
