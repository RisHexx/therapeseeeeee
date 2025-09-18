import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/auth/AuthProvider";

export default function RequireAdmin({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user?.role !== "admin") return <Navigate to="/profile" replace />;
  return <>{children}</>;
}
