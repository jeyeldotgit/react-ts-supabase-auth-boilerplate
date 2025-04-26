import { Eye, EyeOff } from "lucide-react";

type ConfirmPasswordProps = {
  showConfirmPassword: boolean;
  confirmPassword: string;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  togglePasswordVisibility: (field: "password" | "confirmPassword") => void;
  confirmPasswordError?: string;
};

const ConfirmPassword = ({
  showConfirmPassword,
  confirmPassword,
  setConfirmPassword,
  togglePasswordVisibility,
  confirmPasswordError,
}: ConfirmPasswordProps) => {
  return (
    <div className="flex flex-col relative">
      <label htmlFor="confirmPassword" className="text-sm text-gray-600 mb-1">
        Confirm Password
      </label>
      <input
        type={showConfirmPassword ? "text" : "password"}
        id="confirmPassword"
        name="confirmPassword"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className={`px-4 py-2 border rounded-md focus:outline-none focus:ring-2
          ${
            confirmPasswordError
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-gray-500"
          }
        `}
        placeholder="••••••••"
      />
      <div className="relative">
        {confirmPasswordError && (
          <p className="absolute text-red-500 text-sm w-full text-end">
            {confirmPasswordError}
          </p>
        )}
      </div>
      <span
        className="absolute right-3 top-11 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
        onClick={() => togglePasswordVisibility("confirmPassword")}
      >
        {showConfirmPassword ? (
          <Eye className="w-5 h-5" />
        ) : (
          <EyeOff className="w-5 h-5" />
        )}
      </span>
    </div>
  );
};

export default ConfirmPassword;
