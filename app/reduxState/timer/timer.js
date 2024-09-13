import { createSlice } from '@reduxjs/toolkit';

const initialState = { startHour: 0, isRunning: false, endHour: 0, activityId: 0 }

const timerSlice = createSlice({
    name: "timer",
    initialState,
    reducers: {
        startTimer: (state, action) => {
            if (!state.isRunning) {
                state.startHour = action.payload.currentTime
                state.activityId = action.payload.activityID
                state.isRunning = true;
            }
        },
        stopTimer: (state, action) => {
            if (state.isRunning) {
                state.isRunning = false;
                state.endHour = action.payload
            }
        },
        resetTimer: (state) => {
            state.startHour = 0
            activityId = 0
            state.isRunning = false;
        }
    },
});

export const { startTimer, stopTimer, resetTimer } = timerSlice.actions;

export default timerSlice.reducer;
