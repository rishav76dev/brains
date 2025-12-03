import { ArrowRight, Sparkles } from "lucide-react";
import { ButtonL } from "./ButtonL";
import { useNavigate } from "react-router-dom";
import { signin } from "../../utils/utils";
import { useState } from "react";

export default function Hero() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleDemoLogin = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      await signin("rishav", "1234", navigate);
    } catch (error) {
      console.error("Demo login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Changed: Removed 'dotted-bg', added clean white background and adjusted spacing
    <section className="pt-32 pb-24 min-h-screen px-4 bg-white">
      <div className="container mx-auto text-center max-w-4xl">
        {/* Changed: Purple Badge -> Green Badge (Workable Green) */}
        <div className="inline-flex items-center gap-2 bg-emerald-50 text-[#00835C] px-4 py-2 rounded-full text-sm font-semibold mb-8 border border-emerald-100">
          <Sparkles className="w-4 h-4" />
          Your Digital Second Brain
        </div>

        {/* Changed: Gradient Text -> Solid Dark Navy (#1C2939) */}
        <h1 className="text-5xl md:text-6xl font-bold pb-6 text-[#1C2939] leading-tight tracking-tight">
          Curate, Preview & Organize Your Digital Content
        </h1>

        {/* Changed: Text Color -> Slate 500 for softer contrast */}
        <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
          Store tweets, YouTube videos, and documents with rich previews.
          Filter, organize, and access your curated content with a clean,
          minimalist interface built for focus.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* Changed: Primary Button -> Solid Workable Green (#00835C) */}
          <ButtonL
            size="lg"
            className="bg-[#00835C] hover:bg-[#006e4d] text-white text-lg px-8 shadow-sm transition-colors duration-200"
            onClick={() => navigate("/signup")}
          >
            Get Started
            <ArrowRight className="w-5 h-5 ml-2" />
          </ButtonL>

          {/* Changed: Secondary Button -> Gray Outline style */}
          <ButtonL
            variant="outline"
            size="lg"
            className="text-lg px-8 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400"
            onClick={handleDemoLogin}
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Try Demo"}
          </ButtonL>
        </div>
      </div>
    </section>
  );
}
