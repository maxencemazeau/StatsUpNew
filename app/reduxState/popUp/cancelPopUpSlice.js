import { createSlice } from "@reduxjs/toolkit"
import { RESET_ALL } from '../action'

const initialState = { value: false }

const CancelPopUpSlice = createSlice({
    name: "cancelPopUp",
    initialState,
    reducers: {
        cancelPopUp: (state, action) => {
            state.value = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(RESET_ALL, () => initialState);
    },
})

export const { cancelPopUp } = CancelPopUpSlice.actions

export default CancelPopUpSlice.reducer;