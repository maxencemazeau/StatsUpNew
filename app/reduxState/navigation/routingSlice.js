import { createSlice } from "@reduxjs/toolkit"

const initialState = { value: [] }

const routingSlice = createSlice({
    name: "globalNavigation",
    initialState,
    reducers: {
        AddRoute: (state, action) => {
            state.value.push(action.payload)
        },
        DeleteRoute: (state, action) => {

            state.value.pop() // Suppression de l'élément
        }
    }
});


export const { AddRoute, DeleteRoute } = routingSlice.actions;

export default routingSlice.reducer;

