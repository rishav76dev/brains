import { ArrowRight, Sparkles } from "lucide-react";
import { ButtonL } from "./ButtonL";
import { useNavigate } from "react-router-dom";
import { signin } from "../../utils/utils";

export default function Hero() {
  const navigate = useNavigate();
  const handleDemoLogin = async () => {
    await signin("rishav", "1234", navigate);
  };

  return (
    <section className="pt-40 min-h-screen px-4 bg-gradient-to-br from-white via-indigo-100 to-purple-400">
      <div className="container mx-auto text-center max-w-4xl">
        <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <Sparkles className="w-4 h-4" />
          Your Digital Second Brain
        </div>
        <h1 className="text-5xl md:text-6xl font-bold pb-6 bg-gradient-to-r from-purple-700 to-indigo-600 bg-clip-text text-transparent leading-tight">
          Curate, Preview & Organize Your Digital Content
        </h1>
        <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
          Store tweets, YouTube videos, and documents with rich previews.
          Filter, organize, and access your curated content with a clean,
          minimalist interface built for focus.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <ButtonL
            size="lg"
            className="bg-gradient-to-r from-purple-400 to-indigo-500 text-lg px-8"
            onClick={() => navigate("/signup")}
          >
            Get Started
            <ArrowRight className="w-5 h-5 ml-2" />
          </ButtonL>
          <ButtonL
            variant="outline"
            size="lg"
            className="text-lg px-8 bg-transparent border border-purple-500 text-purple-700 hover:bg-black"
            onClick={handleDemoLogin}
          >
            Try Demo
          </ButtonL>
        </div>
      </div>
    </section>
  );
}
