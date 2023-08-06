import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { supabase } from "../../libs/supabaseClient.ts";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
const postsAdapter = createEntityAdapter<Post>({
  sortComparer: (a, b) => a.id + b.id,
});

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await supabase.from("posts").select();

  return data;
});

const initialState = postsAdapter.getInitialState({
  status: "idle",
  error: null,
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
        postsAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default postsSlice.reducer;
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors((state) => state.posts);
