import {
  BiCamera,
  BiEditAlt,
  BiImage,
  BiLocationPlus,
  BiSmile,
} from "react-icons/bi";
import { AiOutlinePaperClip } from "react-icons/ai";

const AppPost = () => {
  return (
    <div
      className={
        "w-full min-w-[420px] max-w-[40%] rounded-md border-[1px] border-borderGray bg-mainDark p-4 "
      }
    >
      {/*  User Avatar  + Input*/}
      <div className={"flex items-center justify-between gap-[18px]"}>
        <div className={"h-[40px]  w-[40px] rounded-full bg-blue-400"}></div>
        <input
          type="text"
          placeholder={"What's on your mind?"}
          className={
            "h-[40px] flex-1 rounded-[20px] bg-mainGray px-4 placeholder:text-textGray focus:outline-none"
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
          <BiCamera />
          <BiImage />
          <AiOutlinePaperClip />
          <BiLocationPlus />
          <BiSmile />
        </div>

        {/*CTA BUTTONS*/}
        <div className={"flex items-center justify-between gap-[18px]"}>
          <button className={"text-textGray"}>
            <div className={"flex items-center gap-x-2"}>
              <BiEditAlt size={"18px"} />
              <p className={"font-medium"}>Draft</p>
            </div>
          </button>
          <button
            className={
              "rounded-md border-[2px] border-borderGray px-8 py-1 font-medium text-white"
            }
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppPost;
