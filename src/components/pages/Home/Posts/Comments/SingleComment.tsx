import { Avatar } from "../../../../shared/Avatar.tsx";
import useLoadImage from "../../../../../hooks/useLoadImage.ts";
import { fullName } from "../../../../../utils/functions.ts";
import { TimeAgo } from "../../../../shared/TimeAgo.tsx";
import { Comment } from "../../../../../utils/types/types.ts";
import { Icon } from "../../../../shared/Icon.tsx";
import { BiTrash } from "react-icons/bi";
import { useAppDispatch } from "../../../../../app/hooks.ts";
import { deleteComment } from "../../../../../features/post/actions.ts";
import { useUser } from "../../../../../hooks/useUser.ts";

interface SingleCommentProps {
  comment: Comment;
}
export const SingleComment = ({ comment }: SingleCommentProps) => {
  const dispatch = useAppDispatch();
  const { user } = useUser();
  return (
    <div className={"flex items-start gap-x-4  border-borderGray  px-4 py-2"}>
      {/* eslint-disable-next-line react-hooks/rules-of-hooks */}
      <Avatar url={useLoadImage(comment.users)} size={"35"} />

      <p className={"text-sm font-medium text-textGray"}>
        <span className={"font-medium text-white"}>
          {fullName(comment.users.firstName, comment.users.lastName)}:{" "}
        </span>
        {comment.body}
        <div className={"py-1"}>
          <TimeAgo timestamp={comment.created_at} />
        </div>
      </p>

      {user?.id === comment.user_id && (
        <Icon
          onClick={() =>
            dispatch(
              deleteComment({
                comment_id: comment.id,
                post_id: comment.post_id,
              })
            )
          }
          icon={BiTrash}
          className={"ml-auto text-lg text-white"}
        />
      )}
    </div>
  );
};
