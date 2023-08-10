import { UserContextProvider } from "../context/User/UserContext.tsx";

interface UserProviderProps {
  children: React.ReactNode;
}
const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  return <UserContextProvider>{children}</UserContextProvider>;
};
export default UserProvider;
