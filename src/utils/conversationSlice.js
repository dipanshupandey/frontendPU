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

            const message=action.payload.message;
            const unreadCount=action.payload.unreadCount;
            const receiverId=action.payload.receiverId;
            console.log("Updating conversation from message:",message);
            const conversationIndex= state.data.findIndex(conv=>conv._id===message.conversationId);
            if(conversationIndex===-1){
                return;
            }
            const conversation= state.data[conversationIndex];
            
            conversation.lastMessage=message.text;
            conversation.lastMessageAt=message.createdAt;
            conversation.unreadCount??={};
            conversation.unreadCount[receiverId]=unreadCount;

            if(conversationIndex>0){
            state.data.splice(conversationIndex,1);
            state.data.unshift(conversation);
            }
        },
        updateUnreadCount:(state,action)=>{
            const {conversationId,unreadCount,userId}=action.payload;
            const conversationIndex=state.data.findIndex(conv=>conv._id===conversationId);
            if(conversationIndex===-1){
                return;
            }
            const conversation=state.data[conversationIndex];
            conversation.unreadCount??={};
            conversation.unreadCount[userId]=unreadCount;
        }
    }
});
export const {initConversations,setSelectedConversationId,updateConversationFromMessage,updateUnreadCount}=conversationSlice.actions;
export default conversationSlice.reducer;