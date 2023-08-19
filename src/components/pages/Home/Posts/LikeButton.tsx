import { addLike } from "../../../../features/post/actions.ts";
import { AiFillLike } from "react-icons/ai";
import { twMerge } from "tailwind-merge";
import { FetchedPosts, User } from "../../../../utils/types/types.ts";
import { useAppDispatch } from "../../../../app/hooks.ts";

interface LikeButtonProps {
  user: User | null;
  liked: boolean;
  post: FetchedPosts;
}
export const LikeButton = ({ liked, post, user }: LikeButtonProps) => {
  const dispatch = useAppDispatch();
  return (
    <div
      onClick={() =>
        user?.id
          ? dispatch(addLike({ postId: post?.id, user_id: user.id }))
          : () => {}
      }
      className={"flex cursor-pointer items-center gap-x-2 text-textGray"}
    >
      <AiFillLike className={twMerge("", liked ? "text-blue-500" : "")} />

      <p
        className={twMerge("text-sm font-medium", liked ? "text-blue-500" : "")}
      >
        {liked ? "Liked" : "Like"}
      </p>

      <p
        className={twMerge(
          "rounded-xl  px-2 text-sm font-medium",

          liked ? "text-white bg-blue-500" : " text-textGray bg-mainGray"
        )}
      >
        {post?.likes ? post.likes.length : "0"}
      </p>
    </div>
  );
};
