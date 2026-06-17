import ChatSendMessageButton from "./ChatSendMessageButton";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useSelector } from "react-redux";


const ChatMessageTextArea = () => {
  const [message, setMessage] = useState("");
  const conversationId = useSelector((store) => store?.conversations?.selectedConversationId);

  async function sendMessage() {
    try {
      if (!message.trim()) return;
      if (!conversationId) return;
      await axios.post(
        BASE_URL + `api/conversations/${conversationId}/messages`,
        { text: message },
        { withCredentials: true }
      );
      setMessage("");
    } catch (error) {
      console.log(error.response);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className="border-t border-gray-100 bg-white px-4 py-3">
      <div className="flex items-end gap-2 bg-gray-100 rounded-lg px-3 py-2 focus-within:ring-1 focus-within:ring-gray-300 transition-colors">
        <textarea
          rows={1}
          placeholder="Type a message…"
          className="flex-1 resize-none bg-transparent border-none outline-none text-[15px] text-gray-900 placeholder:text-gray-400 max-h-32 py-1.5 leading-snug"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <ChatSendMessageButton message={message} onSend={sendMessage} />
      </div>
    </div>
  );
};

export default ChatMessageTextArea;
