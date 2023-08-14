import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { UserDetails } from "../utils/types/types.ts";

const useLoadImage = (user: string | null | UserDetails) => {
  const supabaseClient = useSupabaseClient();

  if (!user) {
    return null;
  }

  const { data: imageData } = supabaseClient.storage
    .from("avatars")
    .getPublicUrl(typeof user === "string" ? user : user.avatar_url);

  return imageData.publicUrl;
};

export default useLoadImage;
