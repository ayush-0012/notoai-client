import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // getting the code from url params
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");

        if (!code) {
          console.log("No authorization code present");
          navigate("/");
          return;
        }
        await axiosInstance.get(`/api/auth/callback/google?code=${code}`);

        navigate("/generate");
      } catch (error) {
        console.log("Error in auth callback:", error);
        navigate("/");
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p>Authenticating...</p>
    </div>
  );
};

export default AuthCallback;
