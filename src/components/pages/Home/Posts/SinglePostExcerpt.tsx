import React, { useEffect, useState } from "react";
import { EntityId } from "@reduxjs/toolkit";
import { useAppSelector } from "../../../../app/hooks.ts";
import { selectPostById } from "../../../../features/post/postsSlice.ts";
import { Icon } from "../../../shared/Icon.tsx";
import { BiDotsVertical, BiSave, BiTime } from "react-icons/bi";
import { TimeAgo } from "../../../shared/TimeAgo.tsx";

import { twMerge } from "tailwind-merge";
import { useUser } from "../../../../hooks/useUser.ts";
import { useLocation } from "react-router-dom";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { supabase } from "../../../../libs/supabaseClient.ts";

import { LikeButton } from "./LikeButton.tsx";
import { fullName, isIdInArray } from "../../../../utils/functions.ts";
import { UserDetails } from "../../../../utils/types/types.ts";
import Modal from "../../../shared/Modal.tsx";
import { LikedByString } from "./LikedByString.tsx";
export const SinglePostExcerpt = React.memo(
  ({ postID }: { postID: EntityId }) => {
    const post = useAppSelector((state) => selectPostById(state, postID));
    const { user, userDetails } = useUser();

    const supabaseClient = useSupabaseClient();
    const [url, setUrl] = useState("");
    const [likeUsers, setLikeUsers] = useState<{ users: UserDetails }[] | null>(
      null
    );
    useEffect(() => {
      if (post) {
        const getUserAvatarUrl = () => {
          const { data: imageData } = supabaseClient.storage
            .from("avatars")
            .getPublicUrl(post?.users.avatar_url);
          setUrl(imageData.publicUrl);
        };
        getUserAvatarUrl();

        const getLikeUsers = async () => {
          const { data } = await supabase
            .from("likes")
            .select(`users(*)`)
            .eq("post_id", post.id);

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          setLikeUsers(data);
        };
        getLikeUsers();
      }
    }, [post]);

    const [openUsersModal, setOpenUsersModal] = useState(false);
    const location = useLocation();
    if (location.pathname === "/account") {
      if (!post || !(user?.id === post.user_id)) return null;
    } else {
      if (!post) return null;
    }
    return (
      <div
        className={
          "mx-auto my-4 w-full  min-w-[420px]  rounded-md border border-borderGray bg-mainDark p-4"
        }
      >
        <div className={"flex items-center justify-between gap-[18px]"}>
          <div className={"flex items-center gap-[18px]"}>
            {/*  Avatar*/}
            <div className={"h-[40px]  w-[40px] rounded-full bg-blue-400"}>
              <img
                src={url}
                alt={"user-image"}
                className={twMerge(
                  `h-[40px] w-[40px] rounded-full object-cover${
                    url ? "opacity-100 transition" : "opacity-50 transition "
                  }`
                )}
              />
            </div>

            {/*  Info*/}
            <div>
              <h1 className={"text-white"}>
                {fullName(post?.users.firstName, post?.users.lastName)}
              </h1>
              <div className={"flex items-center gap-x-1"}>
                <Icon icon={BiTime} className={"text-textGray"} />
                <TimeAgo timestamp={post.created_at} />
              </div>
            </div>
          </div>

          {/*  CTA*/}
          <div className={"flex items-center gap-x-4"}>
            <Icon icon={BiSave} className={"text-[20px] text-white"} />
            <Icon icon={BiDotsVertical} className={"text-[20px] text-white"} />
          </div>
        </div>

        <p className={"my-3 text-sm font-normal text-white"}>{post?.body}</p>

        {/*  Reaction  */}

        <LikeButton
          user={user}
          liked={isIdInArray(user?.id, post?.likes)}
          post={post}
        />

        {likeUsers?.length ? (
          <LikedByString
            onClick={() => setOpenUsersModal(true)}
            userDetails={userDetails}
            likeUsers={likeUsers}
          />
        ) : (
          <p className={"cursor-pointer pt-2 text-sm text-textGray underline"}>
            Loading...
          </p>
        )}

        <Modal
          isOpen={openUsersModal}
          onChange={() => setOpenUsersModal(!openUsersModal)}
          title={"Liked By"}
          description={"Users that liked this post"}
        >
          {likeUsers?.map((user) => (
            <p>{user.users.firstName}</p>
          ))}
        </Modal>
      </div>
    );
  }
);
