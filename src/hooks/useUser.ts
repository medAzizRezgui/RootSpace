import { useContext } from "react";
import { UserContext } from "../context/User/UserContext.tsx";

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a MyUserContextProvider");
  }
  return context;
};
