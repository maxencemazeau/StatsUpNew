import { createSlice } from "@reduxjs/toolkit"
import { RESET_ALL } from '../action'

const initialState = { value: false }

const isActivityLoadingSlice = createSlice({
    name: "isActivityLoading",
    initialState,
    reducers: {
        isActivityLoading: (state, action) => {
            state.value = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(RESET_ALL, () => initialState);
    },
})

export const { isActivityLoading } = isActivityLoadingSlice.actions

export default isActivityLoadingSlice.reducer;