import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import WorkSpace from "./workspace/WorkSpace";


const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="workspace" element={<WorkSpace />} />
    </Routes>
  );
};

export default Router;
