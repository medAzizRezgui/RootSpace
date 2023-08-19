import { BiImage } from "react-icons/bi";
import { Icon } from "../../../shared/Icon.tsx";
import Button from "../../../shared/Button.tsx";
import { useAppDispatch } from "../../../../app/hooks.ts";
import { useState } from "react";
import { addNewPost } from "../../../../features/post/actions.ts";
import { useUser } from "../../../../hooks/useUser.ts";
import useLoadImage from "../../../../hooks/useLoadImage.ts";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import uniqid from "uniqid";
import { Avatar } from "../../../shared/Avatar.tsx";
import { ImageUpload } from "../../../shared/ImageUpload.tsx";
import { PostInput } from "./PostInput.tsx";
import { ImagePreview } from "./ImagePreview.tsx";
export const AddPost = () => {
  const dispatch = useAppDispatch();
  const { user, userDetails } = useUser();
  const avatarUrl = useLoadImage(userDetails);
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const [content, setContent] = useState("");
  const canSave = addRequestStatus === "idle";
  const supabaseClient = useSupabaseClient();
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [preview, setPreview] = useState<string | undefined>(undefined);

  const onPostClicked = async () => {
    if (!canSave) return;
    try {
      setAddRequestStatus("pending");
      if (selectedFile) {
        console.log(selectedFile);
        const id = uniqid();
        const { error: avatarError, data } = await supabaseClient.storage
          .from("post_pictures")
          .upload(`post--${id}`, selectedFile, {
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
        setSelectedFile(undefined);
        setPreview(undefined);
      }

      if (!selectedFile) {
        await dispatch(addNewPost({ body: content })).unwrap();
        setContent("");
        setSelectedFile(undefined);
        setPreview(undefined);
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
      className={" w-full rounded-md border border-borderGray bg-mainDark p-4"}
    >
      {/*  User Avatar  + Input*/}
      <div className={"flex items-center justify-between gap-[18px]"}>
        <Avatar url={avatarUrl} size={"40"} />
        <PostInput content={content} setContent={setContent} />
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
            <ImageUpload
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
              setPreview={setPreview}
            />
          </div>
        </div>

        <Button onClick={onPostClicked} disabled={!canSave}>
          Post
        </Button>
      </div>
      {selectedFile && (
        <ImagePreview
          preview={preview}
          setPreview={setPreview}
          setSelectedFile={setSelectedFile}
        />
      )}
    </div>
  );
};
