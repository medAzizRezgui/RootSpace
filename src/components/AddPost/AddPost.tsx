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
import { useAppDispatch } from "../../app/hooks.ts";
import { useState } from "react";
import { addNewPost } from "../../features/post/postsSlice.ts";
import { supabase } from "../../libs/supabaseClient.ts";

const AppPost = () => {
  const dispatch = useAppDispatch();

  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const [content, setContent] = useState("");
  const onContentChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setContent(e.target.value);
  const canSave = addRequestStatus === "idle";
  const onPostClicked = async () => {
    if (!canSave) return;
    try {
      setAddRequestStatus("pending");
      await dispatch(addNewPost({ body: content, title: "Title" })).unwrap();

      setContent("");
    } catch (_) {
      console.error("Failed to post");
    } finally {
      setAddRequestStatus("idle");
    }
  };

  const SignUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: "azizrezgui4@gmail.com",
      password: "aziztotaziz87",
    });

    console.log("DATA", data, "ERROR", error);
  };

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
          value={content}
          onChange={onContentChanged}
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
              <p className={"font-medium"} onClick={SignUp}>
                Draft
              </p>
            </div>
          </button>
          <Button onClick={onPostClicked} disabled={!canSave}>
            Post
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AppPost;
