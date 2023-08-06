import { Icon } from "../shared/Icon.tsx";
import { BiDotsVertical, BiSave, BiTime } from "react-icons/bi";

export const Post = () => {
  return (
    <div
      className={
        "mx-auto w-full min-w-[420px] max-w-[40%] rounded-md border border-borderGray bg-mainDark p-4"
      }
    >
      {/*  User*/}

      <div className={"flex items-center justify-between gap-[18px]"}>
        <div className={"flex items-center gap-[18px]"}>
          <div className={"h-[40px]  w-[40px] rounded-full bg-blue-400"}></div>
          <div>
            <h1 className={"text-white"}>Paul Jones</h1>
            <div className={"flex items-center gap-x-1"}>
              <Icon icon={BiTime} className={"text-textGray"} />
              <p className={"text-xs text-textGray"}>12 minutes ago</p>
            </div>
          </div>
        </div>

        <div className={"flex items-center gap-x-4"}>
          <Icon icon={BiSave} className={"text-[20px] text-white"} />
          <Icon icon={BiDotsVertical} className={"text-[20px] text-white"} />
        </div>
      </div>

      <p className={"my-3 text-sm font-normal text-white"}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias corporis
        dicta eius eveniet fuga iure maxime praesentium quam repellat tenetur?
      </p>
    </div>
  );
};

export default Post;
