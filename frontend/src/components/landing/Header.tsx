import { useNavigate } from "react-router-dom";
import { ButtonL } from "./ButtonL";
import { Logo } from "../../icons/Logo";

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 text-purple-600 rounded-lg flex items-center justify-center">
            <Logo />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            SecondBrains
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <ButtonL
            variant="outline"
            size="sm"
            onClick={() => navigate("/signin")}
          >
            Sign In
          </ButtonL>
          <ButtonL
            size="sm"
            className="bg-gradient-to-r from-purple-500 to-indigo-500"
            onClick={() => navigate("/signup")}
          >
            Get Started
          </ButtonL>
        </nav>
      </div>
    </header>
  );
}
