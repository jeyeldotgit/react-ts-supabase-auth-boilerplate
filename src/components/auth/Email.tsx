type EmailProps = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  emailError?: string; // optional
};

const Email = ({ email, setEmail, emailError }: EmailProps) => {
  return (
    <div>
      {/* Email */}
      <div className="flex flex-col">
        <label htmlFor="email" className="text-sm text-gray-600 mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`px-4 py-2 border rounded-md focus:outline-none focus:ring-2
            ${
              emailError
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-gray-500"
            }
          `}
          placeholder="you@example.com"
        />
        <div className="relative">
          {emailError && (
            <p className="absolute text-red-500 text-sm w-full text-end">
              {emailError}
            </p>
          )}
        </div>
        {/* Show email error */}
      </div>
    </div>
  );
};

export default Email;
