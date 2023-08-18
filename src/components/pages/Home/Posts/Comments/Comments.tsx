import { twMerge } from "tailwind-merge";
import useGetUserAvatar from "../../../../../hooks/useGetUserAvatar.ts";
import { BiChevronDown, BiSend } from "react-icons/bi";
import { supabase } from "../../../../../libs/supabaseClient.ts";
import { useUser } from "../../../../../hooks/useUser.ts";
import { useState } from "react";
import { FetchedPosts } from "../../../../../utils/types/types.ts";
import { fullName } from "../../../../../utils/functions.ts";
import useLoadImage from "../../../../../hooks/useLoadImage.ts";
import { TimeAgo } from "../../../../shared/TimeAgo.tsx";
import { useAppDispatch } from "../../../../../app/hooks.ts";
import { addNewComment } from "../../../../../features/post/postsSlice.ts";

interface CommentsProps {
  post: FetchedPosts;
}
export const Comments = ({ post }: CommentsProps) => {
  const url = useGetUserAvatar();
  const { user } = useUser();
  const [comment, setComment] = useState("");
  const dispatch = useAppDispatch();
  return (
    <div className={"w-full border-t-[1px] border-borderGray p-4"}>
      {/*  USER AVATAR*/}

      <div className={"flex w-full items-center justify-between gap-x-2"}>
        <img
          src={url}
          alt={"user-image"}
          className={twMerge(
            `h-[35px] w-[35px] rounded-full object-cover${
              url ? "opacity-100 transition" : "opacity-50 transition "
            }`
          )}
        />
        <div className={"relative w-full"}>
          <input
            type="text"
            placeholder={"What's on your mind?"}
            value={comment}
            onChange={(e) => setComment(e.currentTarget.value)}
            className={
              "h-[35px] w-full flex-1 select-none rounded-[20px] bg-mainGray px-4 text-sm text-white placeholder:text-textGray focus:outline-none"
            }
          />
          <BiSend
            onClick={() =>
              dispatch(
                addNewComment({
                  post_id: post.id,
                  user_id: user?.id,
                  body: comment,
                })
              )
            }
            className={
              "absolute right-[10px] top-[50%] -translate-y-1/2 cursor-pointer text-lg text-white transition hover:scale-105"
            }
          />
        </div>
      </div>

      {/*ALL COMMENTS*/}
      <div>
        {post.comments.length > 0 && (
          <div
            className={
              "flex items-center gap-x-1 py-4  text-sm font-medium text-white"
            }
          >
            <p>All Comments</p>
            <BiChevronDown className={"text-lg"} />
          </div>
        )}

        {/*  SINGLE COMMENT */}

        {post?.comments.map((comment) => (
          <div
            className={"flex items-start gap-x-4  border-borderGray  px-4 py-2"}
          >
            <img
              // eslint-disable-next-line react-hooks/rules-of-hooks
              src={useLoadImage(comment.users)}
              alt={"user-image"}
              className={twMerge(
                `h-[35px] w-[35px] rounded-full object-cover${
                  url ? "opacity-100 transition" : "opacity-50 transition "
                }`
              )}
            />

            <p className={"text-sm font-medium text-textGray"}>
              <span className={"font-medium text-white"}>
                {fullName(comment.users.firstName, comment.users.lastName)}:{" "}
              </span>{" "}
              {comment.body}
              <div className={"py-1"}>
                <TimeAgo timestamp={comment.created_at} />
              </div>
            </p>
          </div>
        ))}

        {/*    VIEW ALL COMMENTS*/}

        {post.comments.length > 1 && (
          <div className={"mt-4 w-full border-t-[1px] border-borderGray pt-4"}>
            <p className={"py-1 text-center text-sm font-medium text-blue-500"}>
              View all comments
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
