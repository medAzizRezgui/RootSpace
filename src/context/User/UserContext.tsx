import { createContext, useEffect, useState } from "react";
import {
  useSessionContext,
  useUser as useSupaUser,
} from "@supabase/auth-helpers-react";
import { User, UserDetails } from "../../utils/types/types.ts";

type UserContextType = {
  accessToken: string | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
  user: User | null;
};

// User Context
export const UserContext = createContext<UserContextType | undefined>(
  undefined
);
export interface Props {
  [propName: string]: unknown;
}
export const UserContextProvider = (props: Props) => {
  // Gets Session details
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase,
  } = useSessionContext();
  // Gets the supabase User
  const user = useSupaUser();

  const accessToken = session?.access_token ?? null;
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  // Gets the user details from supabase
  const getUserDetails = () => supabase.from("profiles").select("*").single();

  useEffect(() => {
    if (user && !isLoadingData && !userDetails) {
      setIsLoadingData(true);
      Promise.allSettled([getUserDetails()]).then((results) => {
        const userDetailsPromise = results[0];

        if (userDetailsPromise.status === "fulfilled") {
          setUserDetails(userDetailsPromise.value.data as UserDetails);
        }

        setIsLoadingData(false);
      });
    } else if (!user && !isLoadingUser && !isLoadingData) {
      setUserDetails(null);
    }
  }, [user, isLoadingUser]);

  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingData,
  };

  return <UserContext.Provider value={value} {...props} />;
};
