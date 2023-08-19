import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../app/store.ts";
import type { FetchedPosts } from "../../utils/types/types.ts";
import {
  addLike,
  addNewComment,
  addNewPost,
  deleteComment,
  deletePost,
  fetchPosts,
} from "./actions.ts";

const postsAdapter = createEntityAdapter<FetchedPosts>({
  sortComparer: (a, b) => b.created_at.localeCompare(a.created_at),
});

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
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action);
        postsAdapter.removeOne(state, action.payload);
      })
      .addCase(addNewComment.fulfilled, (state, action) => {
        state.status = "succeeded";
        const post = state.entities[action.payload.post_id];
        if (post) {
          const updatedComments = [...post.comments, action.payload];
          postsAdapter.updateOne(state, {
            id: action.payload.post_id,
            changes: {
              comments: updatedComments,
            },
          });
        }
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        const post = state.entities[action.payload.postId];
        if (post) {
          const updatedComments = post.comments.filter(
            (comment) => comment.id !== action.payload.commentId
          );

          postsAdapter.updateOne(state, {
            id: action.payload.postId,
            changes: {
              comments: updatedComments,
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
