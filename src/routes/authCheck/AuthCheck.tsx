import { useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface AuthCheckProps {
  children: ReactNode;
}

const AuthCheck = (props: AuthCheckProps) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (token) {
      navigate("/admin");
    }
  }, [navigate, token]);

  return props.children;
};

export default AuthCheck;
