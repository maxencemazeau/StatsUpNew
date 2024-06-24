import { createSlice } from "@reduxjs/toolkit"

const initialState = { value:"ACTIVITY" }

const navigationSlice = createSlice({
    name:"homeNavigation",
    initialState,
    reducers:{
        homeNavigation: (state, action) => {
            state.value = action.payload
        }
    }
});


export const { homeNavigation } = navigationSlice.actions;

export default navigationSlice.reducer;

