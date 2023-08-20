import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { User, UserDetails } from "../../utils/types/types.ts";
import { RootState } from "../../app/store.ts";
import { supabase } from "../../libs/supabaseClient.ts";

export interface Notification {
  created_at: string;
  id: number;
  type: "comment" | "like";
  sender_id: User;
  receiver_id: User;
  users: UserDetails;
}
const notificationsAdapter = createEntityAdapter<Notification>({
  sortComparer: (a, b) => b.created_at.localeCompare(a.created_at),
});

const initialState = notificationsAdapter.getInitialState();
export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (user_id: string) => {
    const { data } = await supabase
      .from("notifications")
      .select(`*,users!notifications_sender_id_fkey(*)`)
      .eq("receiver_id", user_id);
    return data;
  }
);

export const deleteNotification = createAsyncThunk(
  "notifications/deleteNotification",
  async (notif_id: number) => {
    await supabase.from("notifications").delete().eq("id", notif_id);
    return notif_id;
  }
);

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        notificationsAdapter.upsertMany(
          state,
          action.payload as Notification[]
        );
      })
      .addCase(deleteNotification.fulfilled, (state, action) =>
        notificationsAdapter.removeOne(state, action.payload)
      );
  },
});

export default notificationsSlice.reducer;

export const { selectAll: selectAllNotifications } =
  notificationsAdapter.getSelectors((state: RootState) => state.notifications);
