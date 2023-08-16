import { Icon } from "../../../shared/Icon.tsx";
import { BiCamera } from "react-icons/bi";
import Input from "../../../shared/Input.tsx";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { User } from "../../../../utils/types/types.ts";

interface ProfilePictureProps {
  avatarUrl: string | any;
  user: null | User;
}
export const ProfilePicture = ({ avatarUrl, user }: ProfilePictureProps) => {
  const supabaseClient = useSupabaseClient();

  const handleUpdateImg = async (img: File | null) => {
    if (!img) return;

    const { error: avatarError } = await supabaseClient.storage
      .from("avatars")
      .upload(`avatar--${user?.id}`, img, {
        cacheControl: "3600",
        upsert: true,
      });

    if (avatarError) {
      console.log("ERROR", avatarError.message);
      // setIsLoading(false);
      return;
    }
  };

  return (
    <div className={"relative h-[150px]  w-[150px] rounded-full"}>
      <img
        alt={"profile-img"}
        src={avatarUrl}
        className={"h-[150px] w-[150px] rounded-full object-cover"}
      />
      <Icon
        icon={BiCamera}
        className={
          "absolute bottom-[15%]  right-0 rounded-full bg-mainGray p-2 text-4xl"
        }
      />
      <Input
        className={
          "absolute top-0  z-[100] h-[150px] w-[150px] cursor-pointer select-none rounded-full opacity-0"
        }
        onChange={(e) =>
          handleUpdateImg(e.target.files ? e.target.files[0] : null)
        }
        id={"image"}
        type={"file"}
        disabled={false}
        accept={"image/*"}
      />
    </div>
  );
};
