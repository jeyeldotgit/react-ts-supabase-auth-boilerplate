import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import Home from "./pages/dashboard/Home";

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/login" element={<Login />}></Route>

      {/* PROTECTED ROUTES */}
      <Route path="/dashboard" element={<Home />}></Route>
    </Routes>
  );
};

export default App;
