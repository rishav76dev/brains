import { Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = localStorage.getItem("token");
  const location = useLocation();

  useEffect(() => {
    if (!token) {
      toast.error("Please log in to access this page");
    }
  }, [token]);

  if (!token) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
