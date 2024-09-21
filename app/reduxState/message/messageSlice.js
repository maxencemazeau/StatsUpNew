import { createSlice } from "@reduxjs/toolkit"
import { RESET_ALL } from '../action'

const initialState = {
    messageType: "",
    messageText: ""
}

const MessageSlice = createSlice({
    name: "Message",
    initialState,
    reducers: {
        Message: (state, action) => {
            state.messageType = action.payload.messageType;
            state.messageText = action.payload.messageText;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(RESET_ALL, () => initialState);
    },
})

export const { Message } = MessageSlice.actions

export default MessageSlice.reducer;