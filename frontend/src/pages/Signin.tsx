import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/input";

import { useNavigate } from "react-router-dom";
import { signin } from "../utils/utils";

export function Signin() {
    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();

    const handleSignin = async () => {
    const username = usernameRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    await signin(username, password, navigate);
};


    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-xl border min-w-48 p-8">
            <Input reference={usernameRef} placeholder="Username" />
            <Input reference={passwordRef} placeholder="Password" />
            <div className="flex justify-center pt-4">
                <Button onClick={handleSignin} loading={false} variant="primary" text="Signin" fullWidth={false} />
            </div>
        </div>
    </div>
}
