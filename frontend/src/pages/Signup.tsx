import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/input";
import { Logo } from "../icons/Logo";
import { useNavigate } from "react-router-dom";
import { signup } from "../utils/utils";

export function Signup() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSignup = async () => {
    const username = usernameRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    await signup(username, password, navigate);
  };

  return (
    <div className="min-h-screen w-full bg-slate-100 flex justify-center items-center px-4">
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 w-full max-w-sm p-6 space-y-6">
        {/* Header */}
        <div className="text-center flex flex-col items-center space-y-2">
          <Logo />
          <h1 className="text-2xl font-semibold text-[#1C2939]">
            Join Brainly
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            Save tweets, documents,
            <br />
            YouTube videos to free your mind
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
        <div className="pt-2">
          <Button
            onClick={handleSignup}
            loading={false}
            variant="primary"
            text="Sign up"
            fullWidth={true}
          />

          <p className="text-center text-slate-600 text-sm pt-4">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/signin")}
              className="text-[#00835C] hover:text-[#006e4d] cursor-pointer font-medium"
            >
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
