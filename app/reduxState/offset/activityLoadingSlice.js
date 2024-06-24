import { createSlice } from "@reduxjs/toolkit"

const initialState = { value: false }

const isActivityLoadingSlice = createSlice({
    name:"isActivityLoading",
    initialState,
    reducers:{
        isActivityLoading: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { isActivityLoading } = isActivityLoadingSlice.actions

export default isActivityLoadingSlice.reducer;