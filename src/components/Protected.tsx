import { Navigate } from "react-router-dom";
import { useUser } from "../hooks/useUser.ts";

interface ProtectedProps {
  children: React.ReactNode;
}

export const Protected: React.FC<ProtectedProps> = ({ children }) => {
  const { isLoading, user } = useUser();

  if (isLoading)
    return <div className={"h-[100vh] w-full bg-red-500"}>Loading...</div>;

  if (!isLoading && !user) {
    return <Navigate to={"/auth"} replace />;
  }
  if (!isLoading && user) return children;
};
