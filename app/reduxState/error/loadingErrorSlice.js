import { createSlice } from "@reduxjs/toolkit"
import { RESET_ALL } from '../action'

const initialState = { value: false }

const loadingErrorSlice = createSlice({
    name: "loadingError",
    initialState,
    reducers: {
        loadingError: (state, action) => {
            state.value = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(RESET_ALL, () => initialState);
    },
})

export const { loadingError } = loadingErrorSlice.actions

export default loadingErrorSlice.reducer;