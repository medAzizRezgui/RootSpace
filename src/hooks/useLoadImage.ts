import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { UserDetails } from "../utils/types/types.ts";
import NoUserImg from "../../public/assets/images/no-user.webp";
const useLoadImage = (user: string | null | UserDetails): string | any => {
  const supabaseClient = useSupabaseClient();

  if (!user) {
    return NoUserImg;
  }
  const { data: imageData } = supabaseClient.storage
    .from("avatars")
    .getPublicUrl(typeof user === "string" ? user : user.avatar_url);

  return imageData.publicUrl;
};

export default useLoadImage;
