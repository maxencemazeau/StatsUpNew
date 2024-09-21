import { createSlice } from "@reduxjs/toolkit"
import { RESET_ALL } from '../action'

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
    },
    extraReducers: (builder) => {
        builder.addCase(RESET_ALL, () => initialState);
    },
})

export const { incrementGoalOffset, resetGoalOffset } = goalSlice.actions

export default goalSlice.reducer;