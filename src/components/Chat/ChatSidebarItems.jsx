import { useDispatch } from "react-redux";
import { setSelectedConversationId } from "../../utils/conversationSlice";


const ChatSidebarItem = ({ connectionData, id, unreadCount, isActive, lastMessage }) => {
    const {
        firstName = "",
        lastName = "",
        photoURL = "",
    } = connectionData;
    const dispatch = useDispatch();

    return (
        <div
            onClick={() => dispatch(setSelectedConversationId(id))}
            className={`group cursor-pointer px-3 py-3 flex items-center gap-3 rounded-lg transition-colors duration-150 ${
                isActive ? "bg-gray-100" : "hover:bg-gray-50"
            }`}
        >
            <div className="shrink-0">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                    <img
                        src={photoURL || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            <div className="flex-1 min-w-0">
                <h2 className={`text-[15px] truncate ${unreadCount > 0 ? "font-semibold text-gray-900" : "font-medium text-gray-800"}`}>
                    {firstName} {lastName}
                </h2>
                <p className="text-[13px] text-gray-400 mt-0.5 truncate">{lastMessage}</p>
            </div>

            {unreadCount > 0 && (
                <div className="shrink-0 bg-gray-800 text-white text-[11px] font-medium rounded-full min-w-5 h-5 px-1.5 flex items-center justify-center">
                    {unreadCount}
                </div>
            )}
        </div>
    );
};

export default ChatSidebarItem;
