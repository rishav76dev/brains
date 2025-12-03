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
    <div className="min-h-screen w-full bg-slate-100 flex justify-center items-center px-4">
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 w-full max-w-sm p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 flex flex-col items-center">
          <Logo />
          <h1 className="text-2xl font-semibold text-[#1C2939]">
            Welcome Back
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            Sign in to access your saved tweets, <br />
            documents, and videos
          </p>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          <div>
            <p className="font-medium text-[#1C2939] pb-1">Username</p>
            <Input reference={usernameRef} placeholder="Username" />
          </div>

          <div>
            <p className="font-medium text-[#1C2939] pb-1">Password</p>
            <Input reference={passwordRef} placeholder="Password" />
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-4 pt-2">
          <Button
            onClick={handleSignin}
            loading={false}
            variant="primary"
            text="Sign in"
            fullWidth={true}
          />

          <p className="text-center text-slate-600 text-sm">
            New here?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-[#00835C] hover:text-[#006e4d] cursor-pointer font-medium"
            >
              Create an account
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
