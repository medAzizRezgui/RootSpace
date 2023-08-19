import { BiMessageAltDetail } from "react-icons/bi";

interface CommentButtonProps {
  comments: number;
}
export const CommentButton = ({ comments }: CommentButtonProps) => {
  return (
    <div className={"flex cursor-pointer items-center gap-x-2 text-textGray"}>
      <BiMessageAltDetail />

      <p className={"text-sm font-medium"}>Comment</p>

      <p
        className={
          "rounded-xl  bg-mainGray px-2 text-sm font-medium text-textGray"
        }
      >
        {comments}
      </p>
    </div>
  );
};
