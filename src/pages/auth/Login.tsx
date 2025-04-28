import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuthForm from "../../hooks/useAuthForm";
import Email from "../../components/auth/Email";
import Password from "../../components/auth/Password";
import SubmitButton from "../../components/auth/SubmitButton";

// Custom Hooks
import useAuthError from "../../hooks/useAuthError";

// Types
import { UserType } from "../../types/UserType";

// Login Auth API
import { signInUser } from "../../api/AuthCalls";

// Notification Hooks
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  // Handle Form Variables
  const { email, setEmail, password, setPassword } = useAuthForm();

  // Handle Error Variables
  // Handle Form Error States with Custom hook
  const { emailError, passwordError, setError, resetErrors } = useAuthError();

  // Same Validation Logic In the Signup Form
  const formValidation = () => {
    let isValid = true;

    // Reset previous errors
    resetErrors();

    if (!email.trim()) {
      setError("emailError", "Email is required.");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("emailError", "Please enter a valid email address.");
      isValid = false;
    }

    if (!password) {
      setError("passwordError", "Password is required.");
      isValid = false;
    } else if (password.length < 6) {
      setError("passwordError", "Password must be at least 6 characters.");
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    formValidation();

    const formData: UserType = {
      email,
      password,
    };

    const res = await signInUser(formData);
    if (res.success) {
      toast.success("Sign In Successful! Redirecting to Dashboard...");
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000); // 3000 ms = 3 seconds
    } else {
      toast.error(`${res.message}`);
    }
  };

  // Toggle Show Password States
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = (field: "password" | "confirmPassword") => {
    if (field === "password") {
      setShowPassword((prev) => !prev);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-neutral-100">
      {/* Card Container */}
      <div className="bg-white shadow-md rounded-2xl w-full max-w-md p-8 font-sans">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Welcome Back
        </h1>

        <form className="space-y-4" onSubmit={handleLogin}>
          {/* Email */}
          <Email email={email} setEmail={setEmail} emailError={emailError} />

          {/* Password */}
          <Password
            showPassword={showPassword}
            password={password}
            setPassword={setPassword}
            togglePasswordVisibility={togglePasswordVisibility}
            passwordError={passwordError}
          />

          {/* Link to Sign Up */}
          <div className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-blue-600 hover:underline cursor-pointer font-medium"
            >
              Sign up now
            </span>
          </div>

          {/* Submit Button */}
          <SubmitButton label="Sign In" />
          <ToastContainer position="top-center" />
        </form>
      </div>
    </div>
  );
};

export default Login;
