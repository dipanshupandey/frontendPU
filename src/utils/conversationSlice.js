import { createSlice } from "@reduxjs/toolkit";

const conversationSlice=createSlice({
    name:"conversations",
    initialState:{
        data:[],
        loading:false,
        loaded:false,
        error:null
    },
    reducers:{
        initConversations:(state,action)=>{
            state.data=action.payload;
            state.loaded=true;
        }
    }
});
export const {initConversations}=conversationSlice.actions;
export default conversationSlice.reducer;