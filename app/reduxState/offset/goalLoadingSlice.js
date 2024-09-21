import { createSlice } from "@reduxjs/toolkit"
import { RESET_ALL } from '../action'

const initialState = { value: false }

const isGoalLoadingSlice = createSlice({
    name: "isGoalLoading",
    initialState,
    reducers: {
        isGoalLoading: (state, action) => {
            state.value = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(RESET_ALL, () => initialState);
    },
})

export const { isGoalLoading } = isGoalLoadingSlice.actions

export default isGoalLoadingSlice.reducer;