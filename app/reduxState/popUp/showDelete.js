import { createSlice } from "@reduxjs/toolkit"
import { RESET_ALL } from '../action'

const initialState = { value: false }

const ShowDeleteSlice = createSlice({
    name: "showDelete",
    initialState,
    reducers: {
        showDelete: (state, action) => {
            state.value = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(RESET_ALL, () => initialState);
    },
})

export const { showDelete } = ShowDeleteSlice.actions

export default ShowDeleteSlice.reducer;