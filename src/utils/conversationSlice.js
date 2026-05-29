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
        },
        updateConversationFromMessage:(state,action)=>{
            const message=action.payload;
            const conversationIndex= state.data.findIndex(conv=>conv._id===message.conversationId);
            if(conversationIndex===-1){
                return;
            }
            const conversation= state.data[conversationIndex];
            if(conversationIndex>0){
                conversation.lastMessage=message.text;
                conversation.lastMessageAt=message.createdAt;
            }
            state.data.splice(conversationIndex,1);
            state.data.unshift(conversation);
        }
    }
});
export const {initConversations,setSelectedConversationId,updateConversationFromMessage}=conversationSlice.actions;
export default conversationSlice.reducer;