// import { useSupabaseClient } from "@supabase/auth-helpers-react";
// import { useNavigate } from "react-router-dom";
// import { ProfileForm } from "../../components/pages/Account/ProfileForm";
import Button from "../../components/shared/Button.tsx";
import { BiCamera } from "react-icons/bi";
import { Icon } from "../../components/shared/Icon.tsx";
import { AddPost } from "../../components/pages/Home/AddPost";
import useLoadImage from "../../hooks/useLoadImage.ts";
import { fullName } from "../../utils/fullName.ts";
import { User, UserDetails } from "../../utils/types/types.ts";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {
  fetchUserPosts,
  selectPostIds,
} from "../../features/post/postsSlice.ts";
import { useEffect } from "react";
import { Posts } from "../../components/pages/Home/Posts/Posts.tsx";
interface AccountProps {
  userDetails: UserDetails | null;
  user: User | null;
  isLoading: boolean;
}
const Account: React.FC<AccountProps> = ({ userDetails, user, isLoading }) => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPostIds);
  const postStatus = useAppSelector((state) => state.posts.status);
  const error = useAppSelector((state) => state.posts.error);
  useEffect(() => {
    if (postStatus === "succeeded" || isLoading) {
      return;
    }
    if (postStatus === "idle") {
      dispatch(fetchUserPosts(user!.id));
    }
  }, [postStatus, dispatch, isLoading]);

  // const supabaseClient = useSupabaseClient();
  // const router = useNavigate();
  // const handleRefresh = () => {
  //   router("/", { replace: true });
  // };
  // const handleLogout = async () => {
  //   await supabaseClient.auth.signOut();
  //   handleRefresh();
  // };
  const avatarUrl = useLoadImage(userDetails);
  if (!userDetails) return null;

  return (
    <div
      className={
        "flex h-[100vh] items-start bg-bgDark p-24 font-display text-white"
      }
    >
      <div className={"mx-auto w-full max-w-[1200px]"}>
        <div
          className={
            "flex items-center justify-between border-b-2 border-borderGray pb-8"
          }
        >
          {/*PROFILE*/}
          <div className={"flex items-center gap-[12px]"}>
            <div
              className={
                "relative h-[150px]  w-[150px] rounded-full bg-green-400"
              }
            >
              <img
                alt={"profile-img"}
                src={avatarUrl || ""}
                className={"h-[150px] w-[150px] rounded-full object-cover"}
              />
              <Icon
                icon={BiCamera}
                className={
                  "absolute bottom-[15%] right-0 rounded-full bg-mainGray p-2 text-4xl"
                }
              />
            </div>
            <div className={"flex flex-col gap-y-2"}>
              <h1 className={"text-3xl font-medium"}>
                {fullName(userDetails?.firstName, userDetails?.lastName)}
              </h1>
              <p className={"font-medium text-textGray"}>0 Posts</p>
              <p className={"font-medium text-textGray"}>
                {userDetails.email}{" "}
              </p>
            </div>
          </div>
          {/*  CTA*/}

          <div className={"flex items-center gap-[12px]"}>
            <Button className={"border-blue-500 bg-blue-500"}>Add Post</Button>
            <Button>Edit Profile</Button>
          </div>
        </div>

        <div>
          <div className={"p-4"}>
            <AddPost />
          </div>
          <h1 className={"p-2 text-2xl font-medium"}>Posts</h1>

          <Posts postStatus={postStatus} error={error} posts={posts} />
        </div>
      </div>
    </div>
  );
};

export default Account;
