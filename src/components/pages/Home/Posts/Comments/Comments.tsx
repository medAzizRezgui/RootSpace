import { BiChevronDown } from "react-icons/bi";
import { FetchedPosts } from "../../../../../utils/types/types.ts";
import { CommentInput } from "./CommentInput.tsx";
import { SingleComment } from "./SingleComment.tsx";

interface CommentsProps {
  post: FetchedPosts;
}
export const Comments = ({ post }: CommentsProps) => {
  return (
    <div className={"w-full border-t-[1px] border-borderGray p-4"}>
      {/*  ADD COMMENTS*/}

      <CommentInput post_id={post.id} />

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

        {/*  Comments */}
        {post?.comments.map((comment) => (
          <SingleComment key={comment.id} comment={comment} />
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
