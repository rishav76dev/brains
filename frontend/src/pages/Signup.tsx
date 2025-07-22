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
    <div className="min-h-screen w-full bg-gradient-to-br from-white via-indigo-100 to-purple-400 flex justify-center items-center px-4">
      <div className="bg-white rounded-2xl shadow-lg border-black border w-full max-w-sm p-6 sm:p-8 space-y-5">
        <div className="text-center flex flex-col items-center text-purple-600 space-y-2">
          <Logo /> {/* Adjust size as preferred */}
          <h1 className="text-3xl font-semibold text-gray-800">Join Brainly</h1>
          <p className="text-md text-gray-500 pt-1 text-balance text-center ">
            Save tweets, documents,
            <br />
            YouTube videos to free your mind
          </p>
        </div>

        <div className="space-y-4 pl-10">
          <div>
            <p className="font-medium text-xl pl-2">Username</p>
            <Input reference={usernameRef} placeholder="Username" />
          </div>
          <div>
            <p className="font-medium text-xl pl-2">Password</p>
            <Input reference={passwordRef} placeholder="Password" />
          </div>
        </div>

        <div className="pt-2">
          <Button
            onClick={handleSignup}
            loading={false}
            variant="primary"
            text="Sign up"
            fullWidth={true}
          />
        </div>
      </div>
    </div>
  );
}
