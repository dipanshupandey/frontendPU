import ChatSidebar from "../components/Chat/ChatSidebar";
import ChatWindow from "../components/Chat/ChatWindow";

const Chat=()=>{
    return <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
    <ChatSidebar/>
    <ChatWindow/>
</div>
}

export default Chat;