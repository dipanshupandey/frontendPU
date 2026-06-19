import { useSelector } from 'react-redux';

import ChatSidebarItem from './ChatSidebarItems';

const ChatSidebar = () => {
    const conversations = useSelector((store) => store.conversations.data);
    const selectedConversationId = useSelector((store) => store.conversations.selectedConversationId);
    const user = useSelector((store) => store.user);
    const id = user?._id;

    return (
        <div className="w-[30%] max-w-sm h-full flex flex-col border-r border-gray-100 bg-white">
            <div className="px-6 pt-6 pb-4 shrink-0">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Messages</h1>
            </div>

            <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-1">
                {conversations.length === 0 && (
                    <p className="text-sm text-gray-400 text-center px-4 py-8">No conversations yet</p>
                )}
                {conversations.map((item, index) => {
                    
                    const unreadCount = item?.unreadCount[id] || 0;
                    const chatPartner = item?.participants[0]?._id === id ? item?.participants[1] : item?.participants[0];
                    return (
                        <ChatSidebarItem
                            connectionData={chatPartner}
                            key={index}
                            id={item._id}
                            unreadCount={unreadCount}
                            isActive={item._id === selectedConversationId}
                            lastMessage={item?.lastMessage || ""}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default ChatSidebar;
