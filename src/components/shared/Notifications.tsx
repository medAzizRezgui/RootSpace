import { Avatar } from "./Avatar.tsx";
import useLoadImage from "../../hooks/useLoadImage.ts";
import { fullName } from "../../utils/functions.ts";
import { TimeAgo } from "./TimeAgo.tsx";
import { BiTrash } from "react-icons/bi";
import {
  deleteNotification,
  Notification,
} from "../../features/notifications/notificationsSlice.ts";
import { useAppDispatch } from "../../app/hooks.ts";

interface NotificationsProps {
  open: boolean;
  notifications: Notification[];
}
export const Notifications = ({ open, notifications }: NotificationsProps) => {
  const dispatch = useAppDispatch();
  return (
    <div
      className={`${
        open ? "absolute" : "hidden"
      } right-[100px] top-0 z-[500] mt-14 max-h-[400px] cursor-pointer overflow-y-auto rounded-md border border-borderGray  bg-mainDark p-4  text-white`}
    >
      {notifications.length > 0 ? (
        notifications.map((notif) =>
          notif.type === "comment" ? (
            <div className={"flex items-start gap-x-2 py-3"}>
              <Avatar url={useLoadImage(notif?.users.avatar_url)} size={"40"} />
              <div>
                <p className={"text-sm text-textGray"}>
                  <span className={"font-medium text-white"}>
                    {fullName(notif.users.firstName, notif.users.lastName)}
                  </span>{" "}
                  commented on your post.
                </p>
                <TimeAgo timestamp={notif.created_at} />
              </div>
              <BiTrash onClick={() => dispatch(deleteNotification(notif.id))} />
            </div>
          ) : (
            <div className={"flex items-start gap-x-2 py-3"}>
              <Avatar url={useLoadImage(notif?.users.avatar_url)} size={"40"} />
              <div>
                <p className={"text-sm text-textGray"}>
                  <span className={"font-medium text-white"}>
                    {fullName(notif.users.firstName, notif.users.lastName)}
                  </span>{" "}
                  liked your post.
                </p>
                <TimeAgo timestamp={notif.created_at} />
              </div>
              <BiTrash onClick={() => dispatch(deleteNotification(notif.id))} />
            </div>
          )
        )
      ) : (
        <p>No Notifications</p>
      )}
    </div>
  );
};
