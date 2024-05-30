import { useAppSelector } from "@hooks/hooks";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { accessToken } = useAppSelector((state) => state.authSlice);
  return accessToken ? children : <Navigate to={"/signIn?message=login Required"} />;
};

export default ProtectedRoutes;
