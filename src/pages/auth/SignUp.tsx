import { useState } from "react";

// Components
import Email from "../../components/auth/Email";
import Password from "../../components/auth/Password";
import ConfirmPassword from "../../components/auth/ConfirmPassword";
import SubmitButton from "../../components/auth/SubmitButton";

// Notification Component
import { ToastContainer, toast } from "react-toastify";

// Custom Hooks
import useAuthForm from "../../hooks/useAuthForm";
import useAuthError from "../../hooks/useAuthError";

// Types
import { UserType } from "../../types/UserType";

// API
import { signUpNewUser } from "../../api/Auth";

const SignUp = () => {
  // Form Data Variables
  const { email, setEmail, password, setPassword } = useAuthForm();
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  // Handle Email Confirmation Sent
  const notify = () =>
    toast.info("Email Confirmation is sent to your email. Please Verify");

  // Toggle Show Password States
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const togglePasswordVisibility = (field: "password" | "confirmPassword") => {
    if (field === "password") {
      setShowPassword((prev) => !prev);
    } else if (field === "confirmPassword") {
      setShowConfirmPassword((prev) => !prev);
    }
  };

  // Handle Form Error States with Custom hook
  const {
    emailError,
    passwordError,
    confirmPasswordError,
    setError,
    resetErrors,
  } = useAuthError();

  // Form Validation
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

    if (password !== confirmPassword) {
      setError("confirmPasswordError", "Passwords do not match.");
      isValid = false;
    }

    return isValid;
  };

  // Handle Form Submission
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    formValidation();

    const formData: UserType = {
      email,
      password,
    };
    // Call signUpNewUser function
    await signUpNewUser(formData);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-neutral-100">
      {/* Card Container */}
      <div className="bg-white shadow-md rounded-2xl w-full max-w-md p-8 font-sans">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Create an Account
        </h1>

        <form className="space-y-4" onSubmit={handleFormSubmit}>
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

          {/* Confirm Password */}
          <ConfirmPassword
            showConfirmPassword={showConfirmPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            togglePasswordVisibility={togglePasswordVisibility}
            confirmPasswordError={confirmPasswordError}
          />

          {/* Submit Button */}
          <SubmitButton label="Sign Up" notify={notify} />
          <ToastContainer position="top-center" />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
