import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alarms: [], // { id, time, label, snooze, days: [], sound, isActive }
  ringingAlarm: null, // Holds the alarm currently going off
};

const alarmSlice = createSlice({
  name: "alarms",
  initialState,
  reducers: {
    addAlarm: (state, action) => {
      state.alarms.push(action.payload);
      // Sort upcoming alarms (simplified string sort for HH:MM)
      state.alarms.sort((a, b) => a.time.localeCompare(b.time));
    },
    toggleAlarm: (state, action) => {
      const alarm = state.alarms.find((a) => a.id === action.payload);
      if (alarm) alarm.isActive = !alarm.isActive;
    },
    deleteAlarm: (state, action) => {
      state.alarms = state.alarms.filter((a) => a.id !== action.payload);
    },
    triggerAlarm: (state, action) => {
      state.ringingAlarm = action.payload;
    },
    stopAlarm: (state) => {
      if (state.ringingAlarm) {
        // Find and optionally disable the alarm if it doesn't repeat
        const alarm = state.alarms.find((a) => a.id === state.ringingAlarm.id);
        if (alarm && alarm.days.length === 0) {
          alarm.isActive = false;
        }
      }
      state.ringingAlarm = null;
    },
    snoozeAlarm: (state) => {
      // In a real app, you'd add 5 mins to a temp snooze array.
      // For simplicity, we just stop the current ring.
      state.ringingAlarm = null;
    },
    updateAlarm: (state, action) => {
      const index = state.alarms.findIndex((a) => a.id === action.payload.id);
      if (index !== -1) {
        state.alarms[index] = action.payload;
        // Re-sort in case the time changed
        state.alarms.sort((a, b) => a.time.localeCompare(b.time));
      }
    },
  },
});

export const {
  addAlarm,
  toggleAlarm,
  deleteAlarm,
  triggerAlarm,
  stopAlarm,
  snoozeAlarm,
  updateAlarm,
} = alarmSlice.actions;
export default alarmSlice.reducer;
