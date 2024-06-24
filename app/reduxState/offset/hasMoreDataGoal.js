import { createSlice } from "@reduxjs/toolkit"

const initialState = { value: false }

const hasMoreGoalDataSlice = createSlice({
    name:"hasMoreGoalData",
    initialState,
    reducers:{
        noMoreGoalData: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { noMoreGoalData } = hasMoreGoalDataSlice.actions

export default hasMoreGoalDataSlice.reducer;