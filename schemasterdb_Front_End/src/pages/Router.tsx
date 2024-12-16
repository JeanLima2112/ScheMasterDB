import { Route, Routes } from "react-router-dom";
import AuthPage from "./Enter/signin/SignIn";
import SignUp from "./Enter/signup/SignUp";
import WorkSpace from "./workspace/WorkSpace";
import Projects from "./Projects/Projects";
import LandingPage from "./Landing_Page/LandingPage";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/workspace" element={<WorkSpace />} />
      <Route path="/projects" element={<Projects />} />

    </Routes>
  );
};

