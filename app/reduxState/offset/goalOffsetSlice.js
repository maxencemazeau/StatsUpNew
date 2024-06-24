import { createSlice } from "@reduxjs/toolkit"

const initialState = { value: 0 }

const goalSlice = createSlice({
    name:"goalOffset",
    initialState,
    reducers:{
        incrementGoalOffset: (state) => {
            state.value += 5
        }
    }
})

export const { incrementGoalOffset } = goalSlice.actions

export default goalSlice.reducer;