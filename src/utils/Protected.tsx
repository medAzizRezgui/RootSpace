import { Navigate } from "react-router-dom";
import { User } from "./types/types.ts";
import Loading from "../components/shared/Loading.tsx";

interface ProtectedProps {
  children: React.ReactNode;
  isLoading: boolean;
  user: User | null;
}

export const Protected: React.FC<ProtectedProps> = ({
  children,
  isLoading,
  user,
}) => {
  if (isLoading) return <Loading />;

  if (!isLoading && !user) {
    return <Navigate to={"/auth"} replace />;
  }

  if (!isLoading && user) {
    return <>{children}</>; // Wrap children in a fragment or container element
  }

  return null; // Return null if none of the conditions are met
};
