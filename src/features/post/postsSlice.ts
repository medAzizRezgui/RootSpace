import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { supabase } from "../../libs/supabaseClient.ts";
import { RootState } from "../../app/store.ts";

interface Post {
  body: string;
}
export interface FetchedPosts extends Post {
  body: string;
  created_at: string;
  id: number;
  user_id: string;
  likes: number;
  users: {
    firstName: string;
    lastName: string;
    avatar_url: string;
  };
}
const postsAdapter = createEntityAdapter<FetchedPosts>({
  sortComparer: (a, b) => b.created_at.localeCompare(a.created_at),
});

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  console.log("Hey I fetched Posts");
  const { data } = await supabase
    .from("posts")
    .select(`*, users(firstName,lastName,avatar_url)`);

  return data;
});

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (initialPost: Post) => {
    const { data } = await supabase
      .from("posts")
      .insert(initialPost)
      .select(`*,users(firstName,lastName,avatar_url)`);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return data[0];
  }
);

export const addLike = createAsyncThunk(
  "posts/addLike",
  async (postId: number) => {
    // const { data } = await supabase.rpc("update_likes", {
    //   row_id: postId,
    // });
    const { data } = await supabase
      .from("post_likes")
      .insert({ post_id: postId });
    return data;
  }
);
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
      .addCase(addLike.fulfilled, () => {});
  },
});

export default postsSlice.reducer;
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors((state: RootState) => state.posts);
