import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { supabase } from "../../libs/supabaseClient.ts";
import { RootState } from "../../app/store.ts";
import type { FetchedPosts, Post } from "../../utils/types/types.ts";

const postsAdapter = createEntityAdapter<FetchedPosts>({
  sortComparer: (a, b) => b.created_at.localeCompare(a.created_at),
});

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await supabase
    .from("posts")
    .select(
      `*, users(firstName,lastName,avatar_url),likes(*,users(*)),comments(*,users(*))`
    );

  return data;
});

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
const initialState = postsAdapter.getInitialState({
  status: "idle",
  error: "",
});
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        postsAdapter.upsertMany(state, action.payload as FetchedPosts[]);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "";
      })
      .addCase(addNewPost.fulfilled, postsAdapter.addOne)
      .addCase(addLike.fulfilled, postsAdapter.upsertOne)
      .addCase(addNewComment.fulfilled, (state, action) => {
        state.status = "succeeded";
        const post = state.entities[action.payload.post_id];
        if (post) {
          postsAdapter.updateOne(state, {
            id: action.payload.post_id,
            changes: {
              comments: [...post.comments, action.payload],
            },
          });
        }
      });
  },
});

export default postsSlice.reducer;
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors((state: RootState) => state.posts);
