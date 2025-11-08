
import { RiCloseFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, TwitterAuthProvider } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../../firebase.config";
import { FirebaseError } from "firebase/app";
import { useRouter } from "next/navigation";

interface SignupProps {
  show: boolean;
  onClose: () => void;
  switchToLogin : () => void;
}

const Signup: React.FC<SignupProps> = ({ show, onClose, switchToLogin  }) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      onClose();
      router.push("/");
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.message);
      } else {
        setError("An error occurred. Please try again later."); // Fallback message
      }
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      onClose();
      router.push("/");
      console.log("user signed in with Google: ", result.user);
    } catch (error) {
      console.error("Error signing in with Google: ", error);
    }
  };

  const handleTwitterLogin = async () => {
    const provider = new TwitterAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      onClose();
      router.push("/homepage");
      console.log("user signed in with Twitter: ", result.user);
    } catch (error) {
      console.error("Error signing in with Twitter: ", error);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-sm h-auto rounded-xl bg-gray-900 border-2 border-primary border-opacity-30 shadow-2xl shadow-primary/20 animate-fadeIn">
        <div className="flex justify-center items-center w-full">
          <div className="flex flex-col w-full px-6 py-6">
            {/* Header */}
            <div className="text-center mb-5">
              <h1 className="text-text font-bold text-2xl mb-1">
                Create Account
              </h1>
              <p className="text-text opacity-60 text-xs">
                Join us and start sharing your notes
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500 bg-opacity-10 border border-red-500 border-opacity-30 text-red-400 text-xs px-3 py-1.5 rounded-lg mb-3">
                {error}
              </div>
            )}

            <div className="flex flex-col justify-center items-center gap-3">
              <form className="flex flex-col w-full gap-3" onSubmit={handleSignup}>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-text text-xs font-medium opacity-80">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-800 bg-opacity-50 text-text text-sm px-3 py-2 rounded-lg border border-gray-700 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-30 transition-all"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="password" className="text-text text-xs font-medium opacity-80">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-800 bg-opacity-50 text-text text-sm px-3 py-2 rounded-lg border border-gray-700 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-30 transition-all"
                    required
                  />
                  <p className="text-text opacity-50 text-xs mt-0.5">
                    Password must be at least 6 characters
                  </p>
                </div>
                
                <button
                  className="bg-primary bg-opacity-90 hover:bg-opacity-100 text-background font-semibold text-sm mt-1 py-2 px-4 rounded-lg transition-all duration-300 shadow-lg hover:scale-105"
                  type="submit"
                >
                  Create Account
                </button>
              </form>

              <div className="flex justify-center items-center w-full my-1">
                <hr className="border-gray-700 w-full" />
                <p className="text-xs text-text opacity-60 px-2 whitespace-nowrap">
                  Or continue with
                </p>
                <hr className="border-gray-700 w-full" />
              </div>

              <button
                onClick={handleGoogleLogin}
                className="flex items-center justify-center gap-2 border-2 border-gray-700 hover:border-primary hover:bg-gray-800 hover:bg-opacity-50 w-full py-2 text-xs font-medium rounded-lg text-text transition-all duration-300"
              >
                <FcGoogle size={18} />
                Sign up with Google
              </button>

              <p className="text-xs text-text opacity-70 text-center mt-1">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={switchToLogin}
                  className="text-primary font-semibold hover:opacity-80 transition-all"
                >
                  Sign In
                </button>
              </p>
            </div>
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
    </div>
  );
};

export default Signup;
