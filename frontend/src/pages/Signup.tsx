import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/input";
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
    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-xl border min-w-48 p-8">
            <Input reference={usernameRef} placeholder="Username" />
            <Input reference={passwordRef} placeholder="Password" />
            <div className="flex justify-center pt-4">
                <Button onClick={handleSignup } loading={false} variant="primary" text="Signup" fullWidth={true} />
            </div>
        </div>
    </div>
}
