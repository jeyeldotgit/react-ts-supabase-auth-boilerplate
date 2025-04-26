import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuthForm from "../../hooks/useAuthForm";
import Email from "../../components/auth/Email";
import Password from "../../components/auth/Password";
import SubmitButton from "../../components/auth/SubmitButton";

const Login = () => {
  const { email, setEmail, password, setPassword } = useAuthForm();

  // Toggle Show Password States
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = (field: "password" | "confirmPassword") => {
    if (field === "password") {
      setShowPassword((prev) => !prev);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-neutral-100">
      {/* Card Container */}
      <div className="bg-white shadow-md rounded-2xl w-full max-w-md p-8 font-sans">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Welcome Back
        </h1>

        <form className="space-y-4">
          {/* Email */}
          <Email email={email} setEmail={setEmail} />

          {/* Password */}
          <Password
            showPassword={showPassword}
            password={password}
            setPassword={setPassword}
            togglePasswordVisibility={togglePasswordVisibility}
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
        </form>
      </div>
    </div>
  );
};

export default Login;
