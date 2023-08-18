import { BiEditAlt, BiImage, BiLocationPlus, BiSmile } from "react-icons/bi";
import { AiOutlinePaperClip } from "react-icons/ai";
import { Icon } from "../../../shared/Icon.tsx";
import Button from "../../../shared/Button.tsx";
import { useAppDispatch } from "../../../../app/hooks.ts";
import { useState } from "react";
import { addNewPost } from "../../../../features/post/postsSlice.ts";
import { useUser } from "../../../../hooks/useUser.ts";
import useLoadImage from "../../../../hooks/useLoadImage.ts";
import { twMerge } from "tailwind-merge";
import Input from "../../../shared/Input.tsx";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import uniqid from "uniqid";
export const AddPost = () => {
  const dispatch = useAppDispatch();
  const { user, userDetails } = useUser();
  const avatarUrl = useLoadImage(userDetails);
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const [content, setContent] = useState("");

  const [postPicture, setPostPicture] = useState<File | null>(null);
  const onContentChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setContent(e.target.value);
  const canSave = addRequestStatus === "idle";

  const supabaseClient = useSupabaseClient();

  const onPostClicked = async () => {
    if (!canSave) return;
    try {
      setAddRequestStatus("pending");
      if (postPicture) {
        console.log(postPicture);
        const id = uniqid();
        const { error: avatarError, data } = await supabaseClient.storage
          .from("post_pictures")
          .upload(`post--${id}`, postPicture, {
            cacheControl: "3600",
            upsert: false,
          });

        if (avatarError) {
          console.log("ERROR", avatarError.message);
          return;
        }
        await dispatch(
          addNewPost({ body: content, img_url: data?.path })
        ).unwrap();
        setContent("");
      }

      if (!postPicture) {
        await dispatch(addNewPost({ body: content })).unwrap();
        setContent("");
      }
    } catch (_) {
      console.error("Failed to post");
    } finally {
      setAddRequestStatus("idle");
    }
  };

  if (!user) return null;
  return (
    <div
      className={
        " w-full   rounded-md border border-borderGray bg-mainDark p-4"
      }
    >
      {/*  User Avatar  + Input*/}
      <div className={"flex items-center justify-between gap-[18px]"}>
        <div className={"h-[40px] w-[40px]  overflow-hidden rounded-full "}>
          <img
            className={twMerge(
              `${
                avatarUrl ? "opacity-100 transition" : "opacity-50 transition "
              }`
            )}
            src={avatarUrl}
            alt={"profile-img"}
          />
        </div>
        <input
          type="text"
          placeholder={"What's on your mind?"}
          value={content}
          onChange={onContentChanged}
          className={
            "h-[40px] flex-1 select-none rounded-[20px] bg-mainGray px-4 text-white placeholder:text-textGray focus:outline-none"
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
          <div className={"relative  rounded-full"}>
            <Icon icon={BiImage} />
            <Input
              className={
                "absolute top-0 left-0  z-[100]  cursor-pointer select-none rounded-full opacity-0"
              }
              onChange={(e) =>
                setPostPicture(e.target.files ? e.target.files[0] : null)
              }
              id={"image"}
              type={"file"}
              disabled={false}
              accept={"image/*"}
            />
          </div>

          {/*<Icon icon={BiCamera} />*/}

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
          <Button onClick={onPostClicked} disabled={!canSave}>
            Post
          </Button>
        </div>
      </div>
    </div>
  );
};
