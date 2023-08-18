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

import { LikeButton } from "./LikeButton.tsx";
import { fullName, isIdInArray } from "../../../../utils/functions.ts";
import Modal from "../../../shared/Modal.tsx";
import { LikedByString } from "./LikedByString.tsx";
import { Comments } from "./Comments";
import { CommentButton } from "./CommentButton.tsx";
export const SinglePostExcerpt = React.memo(
  ({ postID }: { postID: EntityId }) => {
    const post = useAppSelector((state) => selectPostById(state, postID));
    const { user, userDetails } = useUser();

    const supabaseClient = useSupabaseClient();
    const [url, setUrl] = useState("");
    const [postImgUrl, setPostImgUrl] = useState("");

    useEffect(() => {
      if (post) {
        const getUserAvatarUrl = () => {
          const { data: imageData } = supabaseClient.storage
            .from("avatars")
            .getPublicUrl(post?.users.avatar_url);
          setUrl(imageData.publicUrl);
        };
        getUserAvatarUrl();
        const getPostImgUrl = () => {
          if (!post.img_url) {
            setPostImgUrl("");
            return;
          }
          const { data: imageData } = supabaseClient.storage
            .from("post_pictures")
            .getPublicUrl(post.img_url);
          setPostImgUrl(imageData.publicUrl);
        };
        getPostImgUrl();
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
          "mx-auto my-4 w-full  min-w-[420px]  rounded-md border border-borderGray bg-mainDark"
        }
      >
        <div className={"p-4"}>
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
              <Icon
                icon={BiDotsVertical}
                className={"text-[20px] text-white"}
              />
            </div>
          </div>

          <p className={"my-3 text-sm font-normal text-white"}>{post?.body}</p>

          {postImgUrl && (
            <img
              src={postImgUrl}
              alt={"pic"}
              className={"w-full mb-8 rounded-md"}
            />
          )}

          {/*  Reaction  */}
          <div className={"flex items-center justify-between"}>
            <LikeButton
              user={user}
              liked={isIdInArray(user?.id, post?.likes)}
              post={post}
            />
            <CommentButton comments={post.comments.length} />
          </div>
          {post.likes?.length ? (
            <LikedByString
              onClick={() => setOpenUsersModal(true)}
              userDetails={userDetails}
              likeUsers={post.likes}
            />
          ) : null}
        </div>
        {/*Comment Section*/}

        <Comments post={post} />

        <Modal
          isOpen={openUsersModal}
          onChange={() => setOpenUsersModal(!openUsersModal)}
          title={"Liked By"}
          description={"Users that liked this post"}
        >
          {post.likes?.map((user) => (
            <p>{user.users.firstName}</p>
          ))}
        </Modal>
      </div>
    );
  }
);
