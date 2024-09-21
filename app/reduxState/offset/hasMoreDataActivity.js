import { createSlice } from "@reduxjs/toolkit"
import { RESET_ALL } from '../action'

const initialState = { value: false }

const hasMoreActivityDataSlice = createSlice({
    name: "hasMoreActivityData",
    initialState,
    reducers: {
        noMoreActivityData: (state, action) => {
            state.value = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(RESET_ALL, () => initialState);
    },
})

export const { noMoreActivityData } = hasMoreActivityDataSlice.actions

export default hasMoreActivityDataSlice.reducer;