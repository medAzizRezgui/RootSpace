import { useUser } from "./useUser.ts";
import { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import NoUserImg from "../../public/assets/images/no-user.webp";
const useGetUserAvatar = () => {
  const { userDetails, isLoading } = useUser();
  const supabaseClient = useSupabaseClient();
  const [url, setUrl] = useState("");
  useEffect(() => {
    if (!isLoading && userDetails) {
      const fn = () => {
        const { data: imageData } = supabaseClient.storage
          .from("avatars")
          .getPublicUrl(userDetails?.avatar_url);
        setUrl(imageData.publicUrl);
      };
      fn();
    }
  }, [isLoading, userDetails]);
  if (url) {
    return url;
  } else {
    return NoUserImg;
  }
};

export default useGetUserAvatar;
