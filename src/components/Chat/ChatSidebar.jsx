import { useEffect } from 'react';
import {  useSelector } from 'react-redux';

import ChatSidebarItem from './ChatSidebarItems';

const ChatSidebar=()=>{
    const connections=useSelector((store)=>store.connections);
    
    return <div className=" w-[25%] h-screen overflow-y-auto">
        {connections.map((item,index)=>{
            return <ChatSidebarItem connectionData={item} key={index}/>
        })}
       
         {connections.map((item,index)=>{
            return <ChatSidebarItem connectionData={item} key={index}/>
        })}
        
    </div>
}

export default ChatSidebar;