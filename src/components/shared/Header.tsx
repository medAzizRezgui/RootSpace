import { Link, Outlet } from "react-router-dom";
import { AiFillBell, AiFillHome } from "react-icons/ai";
import useGetUserAvatar from "../../hooks/useGetUserAvatar.ts";
import { useUser } from "../../hooks/useUser.ts";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {
  fetchNotifications,
  selectAllNotifications,
} from "../../features/notifications/notificationsSlice.ts";
import { useEffect, useState } from "react";

import { Notifications } from "./Notifications.tsx";
import { useSubscribe } from "../../hooks/useSubscribe.ts";
const Header = () => {
  const url = useGetUserAvatar();
  const { user, isLoading } = useUser();
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(selectAllNotifications);
  const [openNotifs, setOpenNotifs] = useState(false);
  useSubscribe();
  useEffect(() => {
    if (!isLoading && user) {
      const getNotifs = () => {
        dispatch(fetchNotifications(user.id));
      };

      getNotifs();
    }
  }, [user]);
  return (
    <>
      <div
        className={
          "absolute left-0 top-0 flex w-full  items-center justify-between bg-mainDark px-12 py-2"
        }
      >
        <Link to={"/"}>
          <div className={"flex items-center gap-[4px] text-lg text-white"}>
            <AiFillHome />
            <h1>Home</h1>
          </div>
        </Link>
        <div className={"flex flex-row-reverse items-center gap-x-4"}>
          <Link to={"/account"}>
            <img src={url} alt={"pic"} className={"w-[40px] rounded-full"} />
          </Link>
          <div
            onClick={() => setOpenNotifs(!openNotifs)}
            className={
              "relative flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full border-[1px] border-gray-500 bg-mainGray"
            }
          >
            <p
              className={`${
                notifications.length > 0 ? "absolute" : "hidden"
              } right-[-10px] top-[-5px] rounded-full bg-red-500 px-1 text-white`}
            >
              {notifications.length}
            </p>
            <AiFillBell className={"text-xl text-white "} />
          </div>
        </div>
      </div>
      <Notifications open={openNotifs} notifications={notifications} />
      <div>
        <Outlet />
      </div>
    </>
  );
};
export default Header;
