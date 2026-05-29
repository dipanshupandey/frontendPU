import socket from "../socket";
import {updateConversationFromMessage} from "./conversationSlice";
const registerSocketListener=(dispatch)=>{
    const handleMessage=(message)=>{
    console.log("New message received:",message);
    if(message){
            dispatch(updateConversationFromMessage(message));
    }
    }
    socket.on("message:new",handleMessage);
    return ()=>{
        socket.off("message:new",handleMessage);
    };
}


export default registerSocketListener;