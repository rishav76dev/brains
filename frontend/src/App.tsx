import { Signin } from "./pages/Signin"
import { Signup } from "./pages/Signup"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Dashboard } from "./pages/Dashboard"
import Landing from "./pages/Landing"
function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/test" element={<TestEmbed />} />
    </Routes>
  </BrowserRouter>
}

export default App


// Add this temporary debug component to test
function TestEmbed() {
    return (
      <div>
        <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Test Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
        />
        </div>
    );
}
