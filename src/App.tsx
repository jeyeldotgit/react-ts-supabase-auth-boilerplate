import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import Home from "./pages/dashboard/Home";
import { AuthProvider } from "./contexts/AuthProvider";
import ProtectedRoute from "./components/router/ProtectedRoute";
import NewUserCompletion from "./pages/NewUserCompleteProfile/NewUserCompletion";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>

        {/* PROTECTED ROUTES */}
        <Route element={<ProtectedRoute />}>
          <Route path="/user-profile" element={<NewUserCompletion />}></Route>
          <Route path="/dashboard" element={<Home />}></Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
