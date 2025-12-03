import { useNavigate } from "react-router-dom";
import { ButtonL } from "./ButtonL";
import { Logo } from "../../icons/Logo";

export default function Header() {
  const navigate = useNavigate();
  return (
    // Changed: bg-white/80 -> solid bg-white, lighter border color
    <header className="border-b border-gray-100 bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Changed: Text-purple-600 -> text-[#00835C] (Workable Green) */}
          <div className="w-8 h-8 text-[#00835C] rounded-lg flex items-center justify-center">
            <Logo />
          </div>
          {/* Changed: Removed Gradient -> Solid Dark Navy text (#1C2939) */}
          <span className="text-xl font-bold text-[#1C2939] tracking-tight">
            SecondBrains
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-4">
          {/* Changed: Outline button styled as a clean text link to match Workable's "Log in" */}
          <ButtonL
            variant="outline"
            size="sm"
            className="border-transparent bg-transparent text-slate-600 hover:text-[#00835C] hover:bg-slate-50 font-medium transition-colors"
            onClick={() => navigate("/signin")}
          >
            Sign In
          </ButtonL>
          {/* Changed: Removed Gradient -> Solid Workable Green (#00835C) */}
          <ButtonL
            size="sm"
            className="bg-[#00835C] hover:bg-[#006e4d] text-white font-medium shadow-sm transition-colors"
            onClick={() => navigate("/signup")}
          >
            Get Started
          </ButtonL>
        </nav>
      </div>
    </header>
  );
}
