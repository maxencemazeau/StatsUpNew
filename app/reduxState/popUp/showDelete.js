import { createSlice } from "@reduxjs/toolkit"

const initialState = { value: false }

const ShowDeleteSlice = createSlice({
    name: "showDelete",
    initialState,
    reducers: {
        showDelete: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { showDelete } = ShowDeleteSlice.actions

export default ShowDeleteSlice.reducer;