import { createSlice } from "@reduxjs/toolkit"

const initialState = { value: 0 }

const activitySlice = createSlice({
    name:"activityOffset",
    initialState,
    reducers:{
        incrementActivityOffset: (state) => {
            state.value += 5
        }
    }
})

export const { incrementActivityOffset } = activitySlice.actions

export default activitySlice.reducer;