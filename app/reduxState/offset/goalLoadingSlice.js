import { createSlice } from "@reduxjs/toolkit"

const initialState = { value: false }

const isGoalLoadingSlice = createSlice({
    name:"isGoalLoading",
    initialState,
    reducers:{
        isGoalLoading: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { isGoalLoading } = isGoalLoadingSlice.actions

export default isGoalLoadingSlice.reducer;