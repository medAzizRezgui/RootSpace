import { AddPost } from "../../components/pages/Home/AddPost";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { fetchPosts, selectPostIds } from "../../features/post/postsSlice.ts";
import { useEffect } from "react";
import { Posts } from "../../components/pages/Home/Posts/Posts.tsx";

function Home() {
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

  return (
    <div className={"h-[100vh] bg-bgDark p-24 font-display"}>
      <AddPost />
      <Posts posts={posts} postStatus={postStatus} error={error} />
    </div>
  );
}

export default Home;
