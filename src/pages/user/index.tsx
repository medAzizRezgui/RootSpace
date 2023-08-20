import useLoadImage from "../../hooks/useLoadImage.ts";

import { Posts } from "../../components/pages/Home/Posts/Posts.tsx";

import { ProfileDetails } from "../../components/pages/Account/ProfileDetails";
import { Avatar } from "../../components/shared/Avatar.tsx";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../libs/supabaseClient.ts";
import { UserDetails } from "../../utils/types/types.ts";

const UserPage = () => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { userId } = useParams();
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

      setUserDetails(data);
    };

    getUser();
  }, [userId]);

  const avatarUrl = useLoadImage(userDetails);
  return (
    <div
      className={
        "flex h-full items-start bg-bgDark p-24 font-display text-white"
      }
    >
      <div className={"mx-auto w-full max-w-[1200px]"}>
        <div
          className={
            "flex items-center justify-between border-b-2 border-borderGray pb-8"
          }
        >
          {/*PROFILE*/}
          <div className={"flex items-center gap-[12px]"}>
            {/*Profile Pic*/}
            <Avatar url={avatarUrl} size={"150"} />
            <ProfileDetails userDetails={userDetails} />
          </div>

          {/*  CTA*/}
        </div>

        <div>
          <h1 className={"p-2 text-2xl font-medium"}>Posts</h1>
          <Posts />
        </div>
      </div>
    </div>
  );
};

export default UserPage;
