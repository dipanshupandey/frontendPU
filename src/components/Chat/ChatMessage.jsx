const ChatMessage=({text,css,time,sender})=>{
  console.log(sender);
  function formatChatTime(timestamp) {
  const date = new Date(timestamp);

  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

return  <div className={`chat ${css}`}>
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img
        alt="Tailwind CSS chat bubble component"
        src={sender.photoURL || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
      />
    </div>
  </div>
  <div className="chat-header">
    {`${sender.firstName} ${sender.lastName}`}
    <time className="text-xs opacity-50">{formatChatTime(time)}</time>
  </div>
  <div className="chat-bubble">{text}</div>
  <div className="chat-footer opacity-50">Delivered</div>
</div>

}

export default ChatMessage;