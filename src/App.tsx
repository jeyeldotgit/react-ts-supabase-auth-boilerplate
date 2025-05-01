import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import Home from "./pages/Admin/dashboard/Home";
import { AuthProvider } from "./contexts/AuthProvider";
import ProtectedRoute from "./components/router/ProtectedRoute";
import UserProfile from "./pages/NewUserCompleteProfile/UserProfile";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>

        {/* PROTECTED ROUTES */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<UserProfile />}></Route>
          <Route path="/dashboard" element={<Home />}></Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
