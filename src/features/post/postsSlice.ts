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
  const { data } = await supabase
    .from("posts")
    .select(`*, users(firstName,lastName,avatar_url)`);

  return data;
});

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (initialPost: Post) => {
    const { data } = await supabase.from("posts").insert(initialPost).select();

    return data ? data[0] : initialPost;
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
      .addCase(addNewPost.fulfilled, postsAdapter.addOne);
  },
});

export default postsSlice.reducer;
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors((state: RootState) => state.posts);
