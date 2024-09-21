import { createSlice } from "@reduxjs/toolkit"
import { RESET_ALL } from '../action'

const initialState = { value: "ACTIVITY" }

const navigationSlice = createSlice({
    name: "homeNavigation",
    initialState,
    reducers: {
        homeNavigation: (state, action) => {
            state.value = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(RESET_ALL, () => initialState);
    },
});


export const { homeNavigation } = navigationSlice.actions;

export default navigationSlice.reducer;

