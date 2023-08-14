import React from "react";
import { EntityId } from "@reduxjs/toolkit";
import { useAppSelector } from "../../../../app/hooks.ts";
import { selectPostById } from "../../../../features/post/postsSlice.ts";
import { Icon } from "../../../shared/Icon.tsx";
import { BiDotsVertical, BiSave, BiTime } from "react-icons/bi";
import { TimeAgo } from "../../../shared/TimeAgo.tsx";
import { fullName } from "../../../../utils/fullName.ts";
import useLoadImage from "../../../../hooks/useLoadImage.ts";

export const SinglePostExcerpt = React.memo(
  ({ postID }: { postID: EntityId }) => {
    const post = useAppSelector((state) => selectPostById(state, postID));
    const avatarUrl = useLoadImage(post!.users.avatar_url);
    if (!post) return null;
    return (
      <div
        className={
          "mx-auto my-4 w-full  min-w-[420px] max-w-[40%] rounded-md border border-borderGray bg-mainDark p-4"
        }
      >
        {/*  User*/}

        <div className={"flex items-center justify-between gap-[18px]"}>
          <div className={"flex items-center gap-[18px]"}>
            <div className={"h-[40px]  w-[40px] rounded-full bg-blue-400"}>
              <img
                src={avatarUrl || ""}
                alt={"user-image"}
                className={"h-[40px] w-[40px] rounded-full object-cover"}
              />
            </div>
            <div>
              <h1 className={"text-white"}>
                {fullName(post.users.firstName, post.users.lastName)}
              </h1>
              <div className={"flex items-center gap-x-1"}>
                <Icon icon={BiTime} className={"text-textGray"} />
                <TimeAgo timestamp={post.created_at} />
              </div>
            </div>
          </div>
          <div className={"flex items-center gap-x-4"}>
            <Icon icon={BiSave} className={"text-[20px] text-white"} />
            <Icon icon={BiDotsVertical} className={"text-[20px] text-white"} />
          </div>
        </div>

        <p className={"my-3 text-sm font-normal text-white"}>{post?.body}</p>
      </div>
    );
  }
);
