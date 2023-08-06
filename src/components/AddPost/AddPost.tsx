import {
  BiCamera,
  BiEditAlt,
  BiImage,
  BiLocationPlus,
  BiSmile,
} from "react-icons/bi";
import { AiOutlinePaperClip } from "react-icons/ai";
import { Icon } from "../shared/Icon.tsx";
import Button from "../shared/Button.tsx";

const AppPost = () => {
  return (
    <div
      className={
        "mx-auto w-full min-w-[420px] max-w-[40%] rounded-md border border-borderGray bg-mainDark p-4"
      }
    >
      {/*  User Avatar  + Input*/}
      <div className={"flex items-center justify-between gap-[18px]"}>
        <div className={"h-[40px]  w-[40px] rounded-full bg-blue-400"}></div>
        <input
          type="text"
          placeholder={"What's on your mind?"}
          className={
            "h-[40px] flex-1 select-none rounded-[20px] bg-mainGray px-4 placeholder:text-textGray focus:outline-none"
          }
        />
      </div>

      <div className={"mt-4 flex items-center justify-between"}>
        {/*CTA ICONS*/}
        <div
          className={
            "flex items-center justify-between gap-x-4 text-[28px] text-textGray"
          }
        >
          <Icon icon={BiCamera} />
          <Icon icon={BiImage} />
          <Icon icon={AiOutlinePaperClip} />
          <Icon icon={BiLocationPlus} />
          <Icon icon={BiSmile} />
        </div>

        {/*CTA BUTTONS*/}
        <div className={"flex items-center justify-between gap-[18px]"}>
          <button
            className={
              "select-none text-textGray transition hover:text-white active:opacity-50"
            }
          >
            <div className={"flex items-center gap-x-2"}>
              <BiEditAlt size={"18px"} />
              <p className={"font-medium"}>Draft</p>
            </div>
          </button>
          <Button>Post</Button>
        </div>
      </div>
    </div>
  );
};

export default AppPost;
