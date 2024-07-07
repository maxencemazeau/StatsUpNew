import { createSlice } from "@reduxjs/toolkit"

const initialState = { value: 0 }

const goalSlice = createSlice({
    name: "goalOffset",
    initialState,
    reducers: {
        incrementGoalOffset: (state) => {
            state.value += 6
        },
        resetGoalOffset: (state) => {
            state.value = initialState.value;
        }
    }
})

export const { incrementGoalOffset, resetGoalOffset } = goalSlice.actions

export default goalSlice.reducer;