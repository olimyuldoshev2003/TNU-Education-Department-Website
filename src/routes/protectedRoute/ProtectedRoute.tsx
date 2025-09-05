import { useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const checkAuth = () => {
      if (!token) {
        navigate("/");
      }
    };

    checkAuth();
  }, [navigate, token]);

  return children;
};

export default ProtectedRoute;
