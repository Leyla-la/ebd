import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface NotificationItem {
  id: string;
  type: string;
  title: string;
  content: string;
  sentAt: string;
  read: boolean;
}

interface NotificationState {
  notifications: NotificationItem[];
  unreadCount: number;
}

const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotifications(state, action: PayloadAction<NotificationItem[]>) {
      state.notifications = action.payload;
      state.unreadCount = action.payload.filter(n => !n.read).length;
    },
    addNotification(state, action: PayloadAction<NotificationItem>) {
      state.notifications = [action.payload, ...state.notifications];
      if (!action.payload.read) state.unreadCount += 1;
    },
    markAllAsRead(state) {
      state.notifications = state.notifications.map(n => ({ ...n, read: true }));
      state.unreadCount = 0;
    },
    markAsRead(state, action: PayloadAction<string>) {
      state.notifications = state.notifications.map(n =>
        n.id === action.payload ? { ...n, read: true } : n
      );
      state.unreadCount = state.notifications.filter(n => !n.read).length;
    },
    clearNotifications(state) {
      state.notifications = [];
      state.unreadCount = 0;
    },
  },
});

export const {
  setNotifications,
  addNotification,
  markAllAsRead,
  markAsRead,
  clearNotifications,
} = notificationSlice.actions;

export default notificationSlice.reducer;
