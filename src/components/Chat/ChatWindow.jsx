import { useSelector ,useDispatch} from "react-redux";
import ChatMessage from "./ChatMessage";
import { useEffect, useRef, useState,useLayoutEffect } from "react";
import ChatMessageTextArea from "./ChatMessageTextArea";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import socket from "../../socket";
import ChatShimmer from "./ChatShimmer";


const ChatWindow = () => {
  const {
    data: conversations,
    selectedConversationId
  } = useSelector((store) => store.conversations);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const chatContainerRef = useRef(null);
  const isPrependingRef=useRef(false);
  const previousScrollHeightRef=useRef(0);
  const previousScrollTopRef=useRef(0);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const selectedConversation = conversations.find(item => item._id === selectedConversationId);
  const [onlineStatus,setOnlineStatus]=useState("Offline");
  const [cursor, setCursor] = useState(null);
  const [hasMoreMessages, setHasMoreMessages] = useState(false);
  const [loadingMoreMessages, setLoadingMoreMessages] = useState(false);
  
  useLayoutEffect(() => {
    if (chatContainerRef.current) {
      if(isPrependingRef.current===true){
        const deltaHeight=chatContainerRef.current.scrollHeight-previousScrollHeightRef.current;
        chatContainerRef?.current?.scrollTo({
          top:  previousScrollTopRef.current+deltaHeight,
          behavior: 'auto',
        });
        isPrependingRef.current=false;
      }
      else
      {
      chatContainerRef?.current?.scrollTo({
        top:chatContainerRef.current.scrollHeight,
        behavior:'auto'
      }); 
      }
    }
  }, [messages]);
  
  const partner = selectedConversation?.participants[0]?._id === user?._id
    ? selectedConversation?.participants[1]
    : selectedConversation?.participants[0];

  
  const handleScroll=()=>{
    if(chatContainerRef.current.scrollTop<=20)
    {
      fetchMoreMessages();
    }
  }
  const fetchMoreMessages=async()=>{
    if(!hasMoreMessages || loadingMoreMessages || !selectedConversationId|| !cursor) return;
    try{
      setLoadingMoreMessages(true);
      const res = await axios.get(BASE_URL + `api/conversations/${selectedConversationId}/messages`, { withCredentials: true ,
        params: {
          limit: 30,
          cursor: cursor,
        },
      });
      previousScrollHeightRef.current=chatContainerRef?.current?.scrollHeight;
      previousScrollTopRef.current=chatContainerRef?.current?.scrollTop;
      isPrependingRef.current=true;
      
      setMessages((prev)=>[...res.data.data,...prev]);
      setHasMoreMessages(res.data.hasMore);
      setCursor(res.data.nextCursor);
    }
    catch(error){
      console.log(error.response);
    }
    finally{
      setLoadingMoreMessages(false);
    }
  }
  useEffect(() => {
    if (!selectedConversationId)
      return;
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const res = await axios.get(BASE_URL + `api/conversations/${selectedConversationId}/messages`, { withCredentials: true ,
          params: {
            limit: 30,
            cursor: null,
          },
        });
        // console.log(res.data.data);
        setMessages(res.data.data);
        setHasMoreMessages(res.data.hasMore);
        setCursor(res.data.nextCursor);
      } catch (error) {
        console.log(error.response);
      }
      finally{
        setLoading(false);
      }
    }
    fetchMessages();
  }, [selectedConversationId]);

  useEffect(()=>{
    if(!selectedConversationId)
      return;
    socket.emit("join conversation",selectedConversationId);
    const handleMessageRead=(data)=>{
     
      const message=data?.message;
      
      console.log("New message received in ChatWindow:",message);
      if(String(message?.conversationId) === String(selectedConversationId))
      setMessages((prev)=>[...prev,message]);
     
    }
    socket.on("message:new",handleMessageRead);
    return ()=>{
      socket.off("message:new",handleMessageRead);
    }
  },[selectedConversationId]);

  useEffect(()=>{
    if(!partner?._id) return;

    socket.emit("getOnlineStatus",partner._id);

    const handleInitialStatus=(isOnline)=>{
      setOnlineStatus(isOnline?"Online":"Offline");
    };
    const handleLiveStatus=({userId,isOnline})=>{
      if(String(userId)===String(partner._id))
        setOnlineStatus(isOnline?"Online":"Offline");
    };

    socket.on("onlineStatus",handleInitialStatus);
    socket.on("user:statusChanged",handleLiveStatus);

    return ()=>{
      socket.off("onlineStatus",handleInitialStatus);
      socket.off("user:statusChanged",handleLiveStatus);
    };
  },[partner?._id]);


  if (selectedConversationId === null)
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4-.8L3 20l1.3-3.9A7.96 7.96 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-gray-900">Your messages</h2>
        <p className="text-sm text-gray-400 mt-1">Select a conversation to start chatting</p>
      </div>
    );



  return (
    <div className="flex-1 flex flex-col h-full bg-white">

      <div className="shrink-0 flex items-center gap-3 px-6 py-4 border-b border-gray-100">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100">
          <img
            src={partner?.photoURL || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="min-w-0">
          <h2 className="text-[15px] font-semibold text-gray-900 truncate">
            {partner?.firstName} {partner?.lastName}
          </h2>
          <p className="text-[12px] text-gray-400 flex items-center gap-1">
            <span className={`w-2 h-2 rounded-full ${onlineStatus === "Online" ? "bg-green-400" : "bg-gray-400"}`}/>
            {onlineStatus}
          </p>
        </div>
      </div>

      <div
        ref={chatContainerRef}
        className="px-6 py-4 overflow-y-auto flex-1 "
        id="chat-container"
        onScroll={handleScroll}
      >
        {messages.length === 0 && (
          <div className="h-full flex items-center justify-center">
            <p className="text-sm text-gray-400">No messages yet — say hi 👋</p>
          </div>
        )}
        {loading && <ChatShimmer />}
        {!loading && messages.map((item) => {
          return (
            <ChatMessage
              key={item._id}
              text={item.text}
              css={item.senderId === user?._id ? "chat-end" : "chat-start"}
              time={item.createdAt}
              sender={item.senderId===selectedConversation?.participants[0]?._id?selectedConversation?.participants[0]:selectedConversation?.participants[1]}
            />
          );
        })}
      </div>

      <div className="shrink-0">
        <ChatMessageTextArea />
      </div>

    </div>
  );
}

export default ChatWindow;