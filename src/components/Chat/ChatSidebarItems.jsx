const ChatSidebarItem = ({ connectionData }) => {
    const {
        firstName = "",
        lastName = "",
        gender = "",
        photoURL = "",
        _id = ""
    } = connectionData;
    return <div>
        <div className="bg-white  p-4 flex items-center gap-4 shadow-sm hover:bg-gray-100 transition duration-300 border border-gray-100" >

            <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                <img
                    src={photoURL || "https://via.placeholder.com/150"}
                    alt="Profile"
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="flex-1">
                <h2 className="text-base font-semibold text-gray-900 tracking-tight">
                    {firstName} {lastName}
                </h2>

                <p className="text-sm text-gray-500 mt-0.5">
                   online
                </p>
            </div>
                   </div>
    </div>
}

export default ChatSidebarItem;