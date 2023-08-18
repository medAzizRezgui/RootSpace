import { fullName } from "../../../../utils/functions.ts";
import { Like, UserDetails } from "../../../../utils/types/types.ts";

interface LikedByStringProps {
  likeUsers: Like[];
  userDetails: UserDetails | null;
  onClick: () => void;
}
export const LikedByString = ({
  likeUsers,
  userDetails,
  onClick,
}: LikedByStringProps) => {
  const testYou = () => {
    if (
      fullName(userDetails?.firstName, userDetails?.lastName) ===
      fullName(likeUsers[0]?.users.firstName, likeUsers[0]?.users.lastName)
    ) {
      return "You";
    } else
      return fullName(
        likeUsers[0]?.users.firstName,
        likeUsers[0]?.users.lastName
      );
  };

  return (
    <p
      onClick={onClick}
      className={
        "cursor-pointer max-w-min  min-w-[250px] pt-2 text-sm text-textGray underline"
      }
    >
      Liked By {likeUsers ? testYou() : ""}{" "}
      {likeUsers?.length > 1 ? `and ${likeUsers.length - 1} Other(s)...` : ""}
    </p>
  );
};
