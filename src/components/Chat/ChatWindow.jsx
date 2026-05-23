import { useSelector } from "react-redux";
import ChatMessage from "./ChatMessage";
import { useEffect, useRef, useState } from "react";
import ChatMessageTextArea from "./ChatMessageTextArea";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import socket from "../../socket";


const ChatWindow = () => {
  const {
    data: conversations,
    selectedConversationId
  } = useSelector((store) => store.conversations);
  const user = useSelector((store) => store.user);
  const chatContainerRef = useRef(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!selectedConversationId)
      return;
    const fetchMessages = async () => {
      try {
        const res = await axios.get(BASE_URL + `api/conversations/${selectedConversationId}/messages`, { withCredentials: true });
        console.log(res.data.data);
        setMessages(res.data.data);
      } catch (error) {
        console.log(error.response);
      }
    }
    fetchMessages();
  }, [selectedConversationId]);

  useEffect(()=>{
    if(!selectedConversationId)
      return;
    socket.emit("join conversation",selectedConversationId);
    const handleMessageRead=(message)=>{
      console.log("=?",message,selectedConversationId);
      if(message?.conversationId===selectedConversationId)
      setMessages((prev)=>[...prev,message]);
      
    }
    socket.on("message read",handleMessageRead);
    return ()=>{
      socket.off("message read",handleMessageRead);
    }
  },[selectedConversationId]);


  if (selectedConversationId === null) return <div>No conversations yet</div>
  const conversation = conversations.find(item => item._id === selectedConversationId);

  return (
    <div className="w-[75%]  flex flex-col h-full">


      <div
        ref={chatContainerRef}
        className=" p-6 overflow-y-auto flex-1 "
      >
        {messages.map((item) => {
          return (
            <ChatMessage
              key={item._id}
              text={item.text}
              css={item.senderId === user._id ? "chat-end" : "chat-start"}
            />
          );
        })}
      </div>


      <div className="shrink-0 ">

        <ChatMessageTextArea />
      </div>

    </div>
  );
}

export default ChatWindow;