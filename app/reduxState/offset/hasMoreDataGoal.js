import { createSlice } from "@reduxjs/toolkit"
import { RESET_ALL } from '../action'

const initialState = { value: false }

const hasMoreGoalDataSlice = createSlice({
    name: "hasMoreGoalData",
    initialState,
    reducers: {
        noMoreGoalData: (state, action) => {
            state.value = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(RESET_ALL, () => initialState);
    },
})

export const { noMoreGoalData } = hasMoreGoalDataSlice.actions

export default hasMoreGoalDataSlice.reducer;