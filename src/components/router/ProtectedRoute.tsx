import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [timer, setTimer] = useState(5); // starts at 5 seconds

  useEffect(() => {
    if (!isAuthenticated) {
      const countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setShouldRedirect(true);
            clearInterval(countdown);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated && shouldRedirect) {
    return <Navigate to="/login" replace />;
  }

  if (!isAuthenticated) {
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold mb-2">
          Access Denied, User Unauthenticated
        </h1>
        <h1 className="text-2xl font-bold mb-2">Redirecting to Login...</h1>
        <p className="text-gray-500">
          You will be redirected in {timer} second{timer !== 1 && "s"}.
        </p>
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
