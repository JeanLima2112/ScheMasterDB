import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./Landing_Page/LandingPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/workspace" element={<WorkSpace />} />
        <Route path="/projects" element={<Projects />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
