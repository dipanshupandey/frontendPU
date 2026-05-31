import socket from "../socket";
import {updateConversationFromMessage} from "./conversationSlice";
const registerSocketListener=(dispatch)=>{
    const handleMessage=(data)=>{
    const message=data?.message;
    const unreadCount=data?.unreadCount;
    const receiverId=data?.receiverId;
    console.log("New message received in data:",data);
    if(message){
            dispatch(updateConversationFromMessage({message,unreadCount,receiverId}));
    }
    }
    socket.on("message:new",handleMessage);
    return ()=>{
        socket.off("message:new",handleMessage);
    };
}


export default registerSocketListener;