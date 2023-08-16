import React, { useEffect, useState } from "react";
import { EntityId } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks.ts";
import {
  addLike,
  selectPostById,
} from "../../../../features/post/postsSlice.ts";
import { Icon } from "../../../shared/Icon.tsx";
import { BiDotsVertical, BiLike, BiSave, BiTime } from "react-icons/bi";
import { TimeAgo } from "../../../shared/TimeAgo.tsx";
import { fullName } from "../../../../utils/fullName.ts";

import { twMerge } from "tailwind-merge";
import { useUser } from "../../../../hooks/useUser.ts";
import { useLocation } from "react-router-dom";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
export const SinglePostExcerpt = React.memo(
  ({ postID }: { postID: EntityId }) => {
    const dispatch = useAppDispatch();
    const post = useAppSelector((state) => selectPostById(state, postID));
    const { user } = useUser();
    const supabaseClient = useSupabaseClient();
    const [url, setUrl] = useState("");
    useEffect(() => {
      if (post) {
        const fn = () => {
          const { data: imageData } = supabaseClient.storage
            .from("avatars")
            .getPublicUrl(post?.users.avatar_url);
          setUrl(imageData.publicUrl);
        };
        fn();
      }
    }, [post]);

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

        <div
          onClick={() => dispatch(addLike(post?.id))}
          className={"flex cursor-pointer items-center gap-x-2 text-textGray"}
        >
          <BiLike />
          <p className={"text-sm font-medium"}>Like</p>
          <p className={"rounded-xl bg-mainGray px-2 text-sm font-medium"}>
            {post?.likes}
          </p>
        </div>
      </div>
    );
  }
);
