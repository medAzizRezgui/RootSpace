import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/post/postsSlice.ts";
import userReducer from "../features/user/userSlice.ts";
import authModalReducer from "../features/user/authModalSlice.ts";
export const store = configureStore({
  reducer: {
    posts: postsReducer,
    user: userReducer,
    authModalState: authModalReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
