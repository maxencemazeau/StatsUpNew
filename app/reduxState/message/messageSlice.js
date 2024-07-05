import { createSlice } from "@reduxjs/toolkit"

const initialState = { 
    messageType: "",
    messageText: ""
 }

const MessageSlice = createSlice({
    name:"Message",
    initialState,
    reducers:{
        Message: (state, action) => {
            state.messageType = action.payload.messageType;
            state.messageText = action.payload.messageText;
        }
    }
})

export const { Message } = MessageSlice.actions

export default MessageSlice.reducer;