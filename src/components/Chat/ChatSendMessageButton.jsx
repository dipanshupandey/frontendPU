import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../../utils/constants';
import { useSelector } from 'react-redux';

const ChatSendMessageButton = ({message}) => {
    
    const conversationId=useSelector(store=>store?.conversations?.selectedConversationId);

    async function sendMessage() {
        try {
            const res=await axios.post(BASE_URL+`api/conversations/${conversationId}/messages`,{
                text:message
            },{
                withCredentials:true,
            });
            console.log(res);
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