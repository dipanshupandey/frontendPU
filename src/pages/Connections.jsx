import React, { useEffect } from 'react';
import Connection from '../components/Connection';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { initConnections } from '../utils/connectionsSlice';

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
 

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      
    
      <div className="max-w-2xl mx-auto px-4">
        
       
       <h1 className="text-2xl font-semibold text-gray-900 mb-6 tracking-tight">
  Your Connections
</h1>
      
        {!connections && (
          <p className="text-gray-500">Loading...</p>
        )}

      
        {connections && connections.length === 0 && (
          <p className="text-gray-500">No connections yet</p>
        )}

       
        <div className="space-y-4">
          {connections &&
            connections.map((item) => (
              <Connection
                key={item._id}   
                connectionData={item}
                variant="connections"
              />
            ))}
        </div>

      </div>
    </div>
  );
};

export default Connections;