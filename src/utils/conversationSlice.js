import { createSlice } from "@reduxjs/toolkit";

const conversationSlice=createSlice({
    name:"conversations",
    initialState:{
        data:[],
        loading:false,
        loaded:false,
        error:null,
        selectedConversationId:null,
    },
    reducers:{
        initConversations:(state,action)=>{
            state.data=action.payload;
            state.loaded=true;
        },
        setSelectedConversationId:(state,action)=>{
            state.selectedConversationId= action.payload;
        }
    }
});
export const {initConversations,setSelectedConversationId}=conversationSlice.actions;
export default conversationSlice.reducer;