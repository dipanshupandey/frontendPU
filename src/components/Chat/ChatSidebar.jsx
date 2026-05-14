import { useEffect } from 'react';
import {  useSelector } from 'react-redux';

import ChatSidebarItem from './ChatSidebarItems';

const ChatSidebar=()=>{
    const conversations=useSelector((store)=>store.conversations.data);
    const user=useSelector((store)=>store.user);
    const id=user?._id;
    
    return <div className=" w-[25%] h-screen overflow-y-auto ">
        {conversations.map((item,index)=>{
            const chatPartner=item?.participants[0]?._id===id ? item?.participants[1]:item?.participants[0];
            return <ChatSidebarItem connectionData={chatPartner} key={index}/>
        })}
       
         
        
    </div>
}

export default ChatSidebar;