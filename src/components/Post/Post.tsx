import { Icon } from "../shared/Icon.tsx";
import { BiDotsVertical, BiSave, BiTime } from "react-icons/bi";
import { useAppSelector, useAppDispatch } from "../../app/hooks.ts";
import {
  fetchPosts,
  selectAllPosts,
  selectPostById,
  selectPostIds,
} from "../../features/post/postsSlice.ts";
import { useEffect } from "react";
import { EntityId } from "@reduxjs/toolkit";
import { Simulate } from "react-dom/test-utils";
import error = Simulate.error;

let PostExcerpt = ({ postID }: { postID: EntityId }) => {
  const post = useAppSelector((state) => selectPostById(state, postID));
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
            <h1 className={"text-white"}>{post?.userId}</h1>
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

      <p className={"my-3 text-sm font-normal text-white"}>{post?.body}</p>
    </div>
  );
};

export const Post = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPostIds);
  const postStatus = useAppSelector((state) => state.posts.status);

  const error = useAppSelector((state) => state.posts.error);
  useEffect(() => {
    if (postStatus === "succeeded") {
      return;
    }
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  let content;
  if (postStatus === "loading") {
    content = <h1>Loading.....</h1>;
  } else if (postStatus === "succeeded") {
    content = posts.map((postID) => (
      <PostExcerpt postID={postID} key={postID} />
    ));
  } else if (postStatus === "failed") {
    content = <div>{error}</div>;
  }
  return <div>{content}</div>;
};

export default Post;
