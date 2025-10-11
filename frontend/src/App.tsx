import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/dashboard";
import Landing from "./pages/Landing";
import Notfound from "./pages/Notfound";
import Share from "./pages/Share";
import { Toaster } from "react-hot-toast";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/share/:shareLink" element={<Share />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
