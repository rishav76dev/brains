
import { ArrowRight, Sparkles } from "lucide-react";
import { ButtonL } from "./ButtonL";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto text-center max-w-4xl">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <Sparkles className="w-4 h-4" />
          Your Digital Second Brain
        </div>
        <h1 className="text-5xl md:text-6xl font-bold pb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-tight">
          Curate, Preview & Organize Your Digital Content
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          Store tweets, YouTube videos, and documents with rich previews.
          Filter, organize, and access your curated content with a clean,
          minimalist interface built for focus.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <ButtonL
            size="lg"
            className="bg-gradient-to-r from-blue-300 to-purple-600 text-lg px-8"
            onClick={()=> navigate("/signup")}
          >
            Get Started
            <ArrowRight className="w-5 h-5 ml-2" />
          </ButtonL>
          <ButtonL
            variant="outline"
            size="lg"
            className="text-lg px-8 bg-transparent"
            onClick={()=> navigate("/signup")}
          >
            Watch Demo
          </ButtonL>
        </div>
      </div>
    </section>
  );
}
