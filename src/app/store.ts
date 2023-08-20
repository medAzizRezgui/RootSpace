import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/post/postsSlice.ts";
import notificationsReducer from "../features/notifications/notificationsSlice.ts";
export const store = configureStore({
  reducer: {
    posts: postsReducer,
    notifications: notificationsReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
