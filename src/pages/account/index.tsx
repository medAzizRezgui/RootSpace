// import { useSupabaseClient } from "@supabase/auth-helpers-react";
// import { useNavigate } from "react-router-dom";
// import { ProfileForm } from "../../components/pages/Account/ProfileForm";
import Button from "../../components/shared/Button.tsx";
import { AddPost } from "../../components/pages/Home/AddPost";
import useLoadImage from "../../hooks/useLoadImage.ts";
import { fullName } from "../../utils/fullName.ts";
import { User, UserDetails } from "../../utils/types/types.ts";

import { Posts } from "../../components/pages/Home/Posts/Posts.tsx";
import { ProfileForm } from "../../components/pages/Account/ProfileForm";
import Modal from "../../components/shared/Modal.tsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { ProfilePicture } from "../../components/pages/Account/ProfilePicture";
interface AccountProps {
  userDetails: UserDetails | null;
  user: User | null;
}
const Account: React.FC<AccountProps> = ({ userDetails, user }) => {
  const supabaseClient = useSupabaseClient();
  const router = useNavigate();
  const handleRefresh = () => {
    router("/", { replace: true });
  };
  const handleLogout = async () => {
    await supabaseClient.auth.signOut();
    handleRefresh();
  };
  const [openEditModal, setOpenEditModal] = useState(false);
  useEffect(() => {
    const openModal = () => {
      if (!userDetails?.firstName) {
        setOpenEditModal(true);
      }
    };
    openModal();
  }, [userDetails]);

  const avatarUrl = useLoadImage(userDetails);
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
            {/*Profile Pic*/}
            <ProfilePicture avatarUrl={avatarUrl} user={user} />
            <div className={"flex flex-col gap-y-2"}>
              <h1 className={"text-3xl font-medium"}>
                {fullName(userDetails?.firstName, userDetails?.lastName)}
              </h1>
              <p className={"font-medium text-textGray"}>0 Posts</p>
              <p className={"font-medium text-textGray"}>
                {userDetails?.email}{" "}
              </p>
            </div>
          </div>
          {/*  CTA*/}

          <div className={"flex items-center gap-[12px]"}>
            <Button className={"border-blue-500 bg-blue-500"}>Add Post</Button>
            <Button onClick={() => setOpenEditModal(true)}>Edit Profile</Button>
            <Button onClick={() => handleLogout()}>Logout</Button>
          </div>
        </div>

        <div>
          <div className={"p-4"}>
            <AddPost />
          </div>
          <h1 className={"p-2 text-2xl font-medium"}>Posts</h1>

          <Posts />
          <Modal
            isOpen={openEditModal}
            onChange={() => setOpenEditModal(!openEditModal)}
            title={"Edit Profile"}
            description={"Change your profile's information"}
          >
            <ProfileForm />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Account;
