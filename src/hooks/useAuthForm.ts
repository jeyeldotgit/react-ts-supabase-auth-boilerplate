import { useState } from "react";

const useAuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return {
    email,
    setEmail,
    password,
    setPassword,
  };
};

export default useAuthForm;
