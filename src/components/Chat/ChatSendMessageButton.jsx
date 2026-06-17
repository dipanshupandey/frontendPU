const ChatSendMessageButton = ({ message, onSend }) => {
  return (
    <button
      onClick={onSend}
      disabled={!message.trim()}
      className="shrink-0 px-3 py-1 text-sm font-medium text-gray-700 hover:text-gray-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
    >
      Send
    </button>
  );
};

export default ChatSendMessageButton;
