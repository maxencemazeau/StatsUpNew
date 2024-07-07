import { createSlice } from "@reduxjs/toolkit"

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
    }
})

export const { incrementActivityOffset, resetActivityOffset } = activitySlice.actions

export default activitySlice.reducer;