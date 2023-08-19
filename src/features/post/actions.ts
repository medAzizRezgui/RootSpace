import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../libs/supabaseClient.ts";
import { Post } from "../../utils/types/types.ts";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await supabase
    .from("posts")
    .select(
      `*, users(firstName,lastName,avatar_url),likes(*,users(*)),comments(*,users(*))`
    );
  return data;
});
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (post_id: number) => {
    await supabase.from("posts").delete().eq("id", post_id);
    return post_id;
  }
);
export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (initialPost: Post) => {
    const { data } = await supabase
      .from("posts")
      .insert(initialPost)
      .select(
        `*, users(firstName,lastName,avatar_url),likes(*,users(*)),comments(*,users(*))`
      );

    return data ? data[0] : [];
  }
);
export const deleteComment = createAsyncThunk(
  "posts/deleteComment",
  async ({ comment_id, post_id }: { comment_id: number; post_id: number }) => {
    await supabase.from("comments").delete().eq("id", comment_id);
    return { commentId: comment_id, postId: post_id };
  }
);
export const addLike = createAsyncThunk(
  "posts/addLike",
  async ({ postId, user_id }: { postId: number; user_id: string }) => {
    const likeInsertResult = await supabase
      .from("likes")
      .insert({ post_id: postId });

    if (!likeInsertResult.error) {
      return await fetchPostDataWithLikes(postId);
    }

    const isDuplicateError = likeInsertResult.error?.message.includes(
      "duplicate key value violates unique constraint"
    );
    if (isDuplicateError) {
      await supabase
        .from("likes")
        .delete()
        .eq("post_id", postId)
        .eq("user_id", user_id);
      return await fetchPostDataWithLikes(postId);
    }
  }
);

async function fetchPostDataWithLikes(postId: number) {
  const { data } = await supabase
    .from("posts")
    .select(`*, users(firstName, lastName, avatar_url), likes(*,users(*))`)
    .eq("id", postId);

  return data ? data[0] : [];
}
export const addNewComment = createAsyncThunk(
  "posts/addNewComment",
  async ({
    user_id,
    post_id,
    body,
  }: {
    user_id: string | undefined;
    post_id: number;
    body: string;
  }) => {
    if (!user_id) return;
    const { data } = await supabase
      .from("comments")
      .insert({ user_id, post_id, body })
      .select(`*,users(*)`);

    return data ? data[0] : [];
  }
);
