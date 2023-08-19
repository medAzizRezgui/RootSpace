import { Avatar } from "../../../../shared/Avatar.tsx";
import { BiSend } from "react-icons/bi";
import { addNewComment } from "../../../../../features/post/actions.ts";
import useGetUserAvatar from "../../../../../hooks/useGetUserAvatar.ts";
import { useUser } from "../../../../../hooks/useUser.ts";
import { useState } from "react";
import { useAppDispatch } from "../../../../../app/hooks.ts";

interface CommentInputProps {
  post_id: number;
}
export const CommentInput = ({ post_id }: CommentInputProps) => {
  const url = useGetUserAvatar();
  const { user } = useUser();
  const [comment, setComment] = useState("");
  const dispatch = useAppDispatch();
  return (
    <div className={"flex w-full items-center justify-between gap-x-2"}>
      {/*  USER AVATAR*/}
      <Avatar url={url} size={"35"} />
      <div className={"relative w-full"}>
        <input
          disabled={!user}
          type="text"
          placeholder={"What's on your mind?"}
          value={comment}
          onChange={(e) => setComment(e.currentTarget.value)}
          className={
            "h-[35px] w-full flex-1 select-none rounded-[20px] bg-mainGray px-4 text-sm text-white placeholder:text-textGray focus:outline-none"
          }
        />
        <BiSend
          onClick={() => {
            dispatch(
              addNewComment({
                post_id,
                user_id: user?.id,
                body: comment,
              })
            );

            setComment("");
          }}
          className={
            "absolute right-[10px] top-[50%] -translate-y-1/2 cursor-pointer text-lg text-white transition hover:scale-105"
          }
        />
      </div>
    </div>
  );
};
