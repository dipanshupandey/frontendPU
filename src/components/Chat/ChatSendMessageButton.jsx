import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../../utils/constants';
import { useSelector } from 'react-redux';
import socket from "../../socket";

const ChatSendMessageButton = ({message,setMessage}) => {

    const conversationId=useSelector(store=>store?.conversations?.selectedConversationId);

    async function sendMessage() {
        try {
            if (!message.trim()) return;
            if(!conversationId) return ;
            const res=await axios.post(BASE_URL+`api/conversations/${conversationId}/messages`,{
                text:message
            },{
                withCredentials:true,
            });
            
           
           
            setMessage("");
        } catch (error) {
            console.log(error.response);
        }
    }
  return (
    <div><button className="btn btn-primary" onClick={sendMessage}>
        Send
      </button></div>
  )
}

export default ChatSendMessageButton;