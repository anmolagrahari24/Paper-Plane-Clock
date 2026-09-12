import { configureStore } from '@reduxjs/toolkit';
import alarmReducer from './alarmSlice';

export const store = configureStore({
  reducer: {
    alarms: alarmReducer,
  },
});