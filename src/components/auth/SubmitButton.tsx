type SubmitButtonProps = {
  label: string;
};

const SubmitButton = ({ label }: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      className="w-full mt-4 bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 transition"
    >
      {label}
    </button>
  );
};

export default SubmitButton;
