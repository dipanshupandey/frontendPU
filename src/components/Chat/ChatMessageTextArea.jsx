import ChatSendMessageButton from "./ChatSendMessageButton";
import { useState } from "react";
const ChatMessageTextArea=()=>{
  const [message,setMessage]=useState("");
  
return  <div className="border-t flex gap-2 justify-center items-center p-4">
      <textarea
        placeholder="Type a message..."
        className="textarea textarea-bordered flex-1 resize-none min-h-0 h-10 py-2"
        value={message}
        onChange={(e)=>setMessage(e.target.value)}
      />

      <ChatSendMessageButton message={message}/>
    </div>

}

export default ChatMessageTextArea;