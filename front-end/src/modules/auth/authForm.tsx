import { useState } from "react";
import SignupForm from "./features/signupForm/signupForm";
import SigninForm from "./features/signinForm/signinForm";
import type { UserProfile } from "../../entity/user";

interface AuthFormsProps {
  onUserAuthenticated: (userProfile: UserProfile) => void;
}
const AuthForms: React.FC<AuthFormsProps> = ({ onUserAuthenticated }) => {
  const [isSignUp, setIsSignUp] = useState(true);

  return (
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
          {/* Forms */}
          <div className="space-y-4">
            {isSignUp ? (
              <SignupForm onUserAuthenticated={onUserAuthenticated} />
            ) : (
              <SigninForm onUserAuthenticated={onUserAuthenticated} />
            )}
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">OR</span>
            </div>
          </div>

          {/* Toggle */}
          <div className="text-center">
            <p className="text-gray-600">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-purple-600 hover:text-purple-700 font-semibold"
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </p>
          </div>
        </div>
      </div>
  );
};

export default AuthForms;
