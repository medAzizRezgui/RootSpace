import { useAppSelector, useAppDispatch } from "../../../../app/hooks.ts";
import {
  fetchPosts,
  selectPostIds,
} from "../../../../features/post/postsSlice.ts";
import { useEffect } from "react";
import { SinglePostExcerpt } from "./SinglePostExcerpt.tsx";
import Loading from "../../../shared/Loading.tsx";

export const SinglePost = () => {
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
    content = posts.map((postID) => (
      <SinglePostExcerpt postID={postID} key={postID} />
    ));
  } else if (postStatus === "failed") {
    content = <div>{error}</div>;
  }
  return <div>{content}</div>;
};
