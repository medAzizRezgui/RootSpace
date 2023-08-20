import { useEffect } from "react";
import { supabase } from "../libs/supabaseClient.ts";
import { fetchNotifications } from "../features/notifications/notificationsSlice.ts";
import { useAppDispatch } from "../app/hooks.ts";
import { useUser } from "./useUser.ts";

export const useSubscribe = () => {
  const dispatch = useAppDispatch();
  const { user } = useUser();
  useEffect(() => {
    const channelB = supabase
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
        },
        () => dispatch(fetchNotifications(<string>user?.id))
      )
      .subscribe();
    return () => {
      channelB.unsubscribe();
    };
  }, [user]);
};
