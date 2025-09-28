import { configureStore } from '@reduxjs/toolkit';
import { api } from './api';
import notificationReducer from './notificationSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    notification: notificationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
