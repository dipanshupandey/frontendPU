const ChatMessage = ({ text, css, time, sender }) => {
  function formatChatTime(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  return (
    <div className={`chat ${css}`}>
      <div className="chat-image avatar">
        <div className="w-9 rounded-full">
          <img
            alt="avatar"
            src={sender.photoURL || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
          />
        </div>
      </div>
      <div className="chat-header text-sm text-gray-700">
        {`${sender.firstName} ${sender.lastName}`}
        <time className="text-xs text-gray-400 ml-1">{formatChatTime(time)}</time>
      </div>
      <div className="chat-bubble bg-gray-100 text-gray-900 rounded-lg">{text}</div>
    </div>
  );
};

export default ChatMessage;
