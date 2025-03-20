import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const ProtectedRoute = ({ children }: { children?: React.ReactNode }) => {
  const { isAuthenticated, isLoading, fetchAuthStatus } = useAuthStore();

  useEffect(() => {
    fetchAuthStatus();
  }, [fetchAuthStatus]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
