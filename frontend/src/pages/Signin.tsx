import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/input";
import { Logo } from "../icons/Logo";
import { useNavigate, useLocation } from "react-router-dom";
import { signin } from "../utils/utils";

export function Signin() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignin = async () => {
    const username = usernameRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    // Get the page user was trying to access, default to dashboard
    const from = location.state?.from?.pathname || "/dashboard";

    try {
      await signin(username, password, () => navigate(from));
    } catch {
      // Error handling is done in the signin function
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white via-indigo-100 to-purple-400 flex justify-center items-center px-4">
      <div className="bg-white rounded-2xl shadow-lg border-black border w-full max-w-sm p-6 sm:p-8 space-y-5">
        <div className="text-center space-y-2 flex flex-col items-center text-purple-600">
          <Logo /> {/* Add your preferred height/width */}
          <h1 className="text-3xl font-semibold text-gray-800">Welcome Back</h1>
          <p className="text-md text-gray-500 pt-1 text-balance text-center">
            Sign in to access your saved tweets,
            <br />
            documents, and videos
          </p>
        </div>

        <div className="space-y-4 ">
          <div>
            <p className="font-medium text-xl pl-2">Username</p>
            <Input reference={usernameRef} placeholder="Username" />
          </div>
          <div>
            <p className="font-medium text-xl pl-2">Password</p>
            <Input reference={passwordRef} placeholder="Password" />
          </div>
        </div>

        <div className="pt-2 space-y-4">
          <Button
            onClick={handleSignin}
            loading={false}
            variant="primary"
            text="Sign in"
            fullWidth={true}
          />

          <p className="text-center text-gray-600 text-sm">
            New here?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-purple-600 hover:text-purple-800 cursor-pointer font-medium"
            >
              Create an account
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
