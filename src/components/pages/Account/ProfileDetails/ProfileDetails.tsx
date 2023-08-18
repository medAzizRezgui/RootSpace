import { UserDetails } from "../../../../utils/types/types.ts";
import { fullName } from "../../../../utils/functions.ts";

type ProfileDetailsProps = {
  userDetails: UserDetails | null;
};
export const ProfileDetails = ({ userDetails }: ProfileDetailsProps) => {
  return (
    <div className={"flex flex-col gap-y-2"}>
      <h1 className={"text-3xl font-medium"}>
        {fullName(userDetails?.firstName, userDetails?.lastName)}
      </h1>
      <p className={"font-medium text-textGray"}>0 Posts</p>
      <p className={"font-medium text-textGray"}>{userDetails?.email} </p>
    </div>
  );
};
