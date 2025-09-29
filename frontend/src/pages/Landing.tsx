import Hero from "../components/landing/Hero";
import Header from "../components/landing/Header";
// import Footer from "../components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="app-background">
      <div className="relative z-10">
        <Header />
        <Hero />
        {/* <Footer /> */}
      </div>
    </div>
  );
}
