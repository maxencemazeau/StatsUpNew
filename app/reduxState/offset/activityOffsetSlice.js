import { createSlice } from "@reduxjs/toolkit"
import { RESET_ALL } from '../action'

const initialState = { value: 0 }

const activitySlice = createSlice({
    name: "activityOffset",
    initialState,
    reducers: {
        incrementActivityOffset: (state) => {
            state.value += 6
        },
        resetActivityOffset: (state) => {
            state.value = initialState.value;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(RESET_ALL, () => initialState);
    },
})

export const { incrementActivityOffset, resetActivityOffset } = activitySlice.actions

export default activitySlice.reducer;