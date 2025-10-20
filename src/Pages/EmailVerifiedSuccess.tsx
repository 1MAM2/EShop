import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const EmailVerifiedSuccess = () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 text-center px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-sm w-full border border-gray-200 text-3xl">
        <div className="flex justify-center mb-4">
          <FaCheckCircle className="text-green-500 w-16 h-16" />
          
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Email Verified!
        </h1>
        <p className="text-gray-600 mb-6">
           Congratulations! Your email address has been successfully verified. You can now access all features.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
        >
           Back to Home
        </button>
      </div>
    </div>
  );
};

export default EmailVerifiedSuccess;
