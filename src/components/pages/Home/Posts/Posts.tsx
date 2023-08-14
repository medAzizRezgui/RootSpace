import { EntityId } from "@reduxjs/toolkit";

import { SinglePostExcerpt } from "./SinglePostExcerpt.tsx";
import Loading from "../../../shared/Loading.tsx";

interface PostsProps {
  postStatus: string;
  error: string;
  posts: EntityId[];
}
export const Posts: React.FC<PostsProps> = ({ postStatus, error, posts }) => {
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
