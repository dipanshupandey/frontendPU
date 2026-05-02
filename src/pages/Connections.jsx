import React, { useEffect } from 'react';
import Connection from '../components/Connection';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch,useSelector } from 'react-redux';
import { initConnections } from '../utils/connectionsSlice';
import store from '../utils/store';
const Connections = () => {
    const dispatch=useDispatch();
    const connections=useSelector((store)=>store.connections);
    async function fetchConnections()
    {
        try {
            const res=await axios.get(BASE_URL+"user/connections",{
                withCredentials:true
            });
            dispatch(initConnections(res.data.data));
            // console.log(res.data.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        fetchConnections();
    },[])
  return (
    <div>
       { connections&&connections.map((item,index)=><Connection key={index} connectionData={item}/>)
        
       }
    </div>
  )
}

export default Connections