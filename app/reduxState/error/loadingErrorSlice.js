import { createSlice } from "@reduxjs/toolkit"

const initialState = { value: false }

const loadingErrorSlice = createSlice({
    name:"loadingError",
    initialState,
    reducers:{
        loadingError: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { loadingError } = loadingErrorSlice.actions

export default loadingErrorSlice.reducer;