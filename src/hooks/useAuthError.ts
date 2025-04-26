import { useState } from "react";

type AuthError = {
  emailError: string;
  passwordError: string;
  confirmPasswordError: string;
};

const useAuthError = () => {
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");

  const resetErrors = () => {
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
  };

  const setError = (field: keyof AuthError, message: string) => {
    switch (field) {
      case "emailError":
        setEmailError(message);
        break;
      case "passwordError":
        setPasswordError(message);
        break;
      case "confirmPasswordError":
        setConfirmPasswordError(message);
        break;
      default:
        break;
    }
  };

  return {
    emailError,
    passwordError,
    confirmPasswordError,
    setError,
    resetErrors,
  };
};

export default useAuthError;
