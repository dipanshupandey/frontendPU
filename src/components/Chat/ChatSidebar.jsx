import { useEffect } from 'react';
import {  useSelector } from 'react-redux';
import Connection from '../Connection';

const ChatSidebar=()=>{
    const connections=useSelector((store)=>store.connections);
    console.log(connections);
    return <div className="bg-amber-950 w-[25%]">
        {connections.map((item)=>{
            return <Connection connectionData={item} variant="connections"/>
        })}
    </div>
}

export default ChatSidebar;