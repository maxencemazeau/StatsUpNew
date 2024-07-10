import { createSlice } from "@reduxjs/toolkit"

const initialState = { value: false }

const CancelPopUpSlice = createSlice({
    name: "cancelPopUp",
    initialState,
    reducers: {
        cancelPopUp: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { cancelPopUp } = CancelPopUpSlice.actions

export default CancelPopUpSlice.reducer;