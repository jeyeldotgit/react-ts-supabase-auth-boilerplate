import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import Home from "./pages/dashboard/Home";
import { AuthProvider } from "./contexts/AuthProvider";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>

        {/* PROTECTED ROUTES */}
        <Route path="/dashboard" element={<Home />}></Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
