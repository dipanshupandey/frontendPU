import { createSlice } from "@reduxjs/toolkit";

const conversationSlice=createSlice({
    name:"conversations",
    initialState:{
        data:[],
        loading:false,
        loaded:false,
        error:null,
        selectedConversation:null,
    },
    reducers:{
        initConversations:(state,action)=>{
            state.data=action.payload;
            state.loaded=true;
        },
        setSelectedConversation:(state,action)=>{
            state.selectedConversation= action.payload;
        }
    }
});
export const {initConversations,setSelectedConversation}=conversationSlice.actions;
export default conversationSlice.reducer;