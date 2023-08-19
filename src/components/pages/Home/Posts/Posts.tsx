import { SinglePostExcerpt } from "./SinglePostExcerpt.tsx";
import Loading from "../../../shared/Loading.tsx";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks.ts";
import { selectPostIds } from "../../../../features/post/postsSlice.ts";
import { useEffect } from "react";
import { fetchPosts } from "../../../../features/post/actions.ts";

export const Posts = () => {
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
    content = <Loading />;
  } else if (postStatus === "succeeded") {
    content = posts.map((postID) => {
      return <SinglePostExcerpt postID={postID} key={postID} />;
    });
  } else if (postStatus === "failed") {
    content = <div>{error}</div>;
  }

  return <div>{content}</div>;
};
