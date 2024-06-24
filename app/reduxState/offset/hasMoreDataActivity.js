import { createSlice } from "@reduxjs/toolkit"

const initialState = { value: false }

const hasMoreActivityDataSlice = createSlice({
    name:"hasMoreActivityData",
    initialState,
    reducers:{
        noMoreActivityData: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { noMoreActivityData } = hasMoreActivityDataSlice.actions

export default hasMoreActivityDataSlice.reducer;