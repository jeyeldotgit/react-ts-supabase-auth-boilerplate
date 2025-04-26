import { Eye, EyeOff } from "lucide-react";

type PasswordProps = {
  showPassword: boolean;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  togglePasswordVisibility: (field: "password" | "confirmPassword") => void;
  passwordError?: string;
};

const Password = ({
  showPassword,
  password,
  setPassword,
  togglePasswordVisibility,
  passwordError,
}: PasswordProps) => {
  return (
    <div className="flex flex-col relative">
      <label htmlFor="password" className="text-sm text-gray-600 mb-1">
        Password
      </label>
      <input
        type={showPassword ? "text" : "password"}
        id="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={`px-4 py-2 border rounded-md focus:outline-none focus:ring-2
          ${
            passwordError
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-gray-500"
          }
        `}
        placeholder="••••••••"
      />
      <div className="relative">
        {passwordError && (
          <p className="absolute text-red-500 text-sm w-full text-end">
            {passwordError}
          </p>
        )}
      </div>

      <span
        className="absolute right-3 top-11 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
        onClick={() => togglePasswordVisibility("password")}
      >
        {showPassword ? (
          <Eye className="w-5 h-5" />
        ) : (
          <EyeOff className="w-5 h-5" />
        )}
      </span>
    </div>
  );
};

export default Password;
