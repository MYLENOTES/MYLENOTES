import Image from "next/image";
import { useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import { sendPasswordResetEmail } from "firebase/auth"; // Import Firebase password reset function
import { auth } from "../../../firebase.config";

interface ForgotPasswordProps {
  show: boolean;
  onClose: () => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ show, onClose }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email); // Firebase function to send password reset email
      setMessage("Password reset email sent. Check your inbox.");
      // Close the component after sending email successfully
      onClose();
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-sm h-auto rounded-xl bg-gray-900 border-2 border-primary border-opacity-30 shadow-2xl shadow-primary/20 animate-fadeIn">
        <div className="flex flex-col justify-center items-center px-6 py-6">
          {/* Header */}
          <div className="text-center mb-5">
            <h1 className="text-text font-bold text-2xl mb-1">
              Reset Password
            </h1>
            <p className="text-text opacity-60 text-xs">
              We&apos;ll send you a password reset link
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col w-full gap-3">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-text text-xs font-medium opacity-80">
                Email Address
              </label>
              <p className="text-text opacity-50 text-xs mb-1">
                Enter your registered email address to receive a password reset link.
              </p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800 bg-opacity-50 text-text text-sm px-3 py-2 rounded-lg border border-gray-700 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-30 transition-all"
                required
              />
            </div>

            <button
              className="bg-primary bg-opacity-90 hover:bg-opacity-100 text-background font-semibold text-sm mt-1 py-2 px-4 rounded-lg transition-all duration-300 shadow-lg hover:scale-105"
              type="submit"
            >
              Send Reset Link
            </button>

            {message && (
              <div className="bg-green-500 bg-opacity-10 border border-green-500 border-opacity-30 text-green-400 text-xs px-3 py-1.5 rounded-lg text-center">
                {message}
              </div>
            )}
          </form>
        </div>
        <button
          className="absolute top-3 right-3 p-1.5 text-text hover:text-primary hover:bg-gray-800 rounded-full transition-all"
          onClick={onClose}
          type="button"
        >
          <RiCloseFill size={20} />
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
