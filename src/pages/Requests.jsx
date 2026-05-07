import React, { useEffect } from 'react';
import Connection from '../components/Connection';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { setRequests } from '../utils/requestsSlice';

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  async function fetchRequests() {
    try {
      const res = await axios.get(BASE_URL + "user/requests/interested", {
        withCredentials: true
      });
      dispatch(setRequests(res.data));
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      
    
      <div className="max-w-2xl mx-auto px-4">
        
       
       <h1 className="text-2xl font-semibold text-gray-900 mb-6 tracking-tight">
  Pending Requests
</h1>
      
        {!requests && (
          <p className="text-gray-500">Loading...</p>
        )}

      
        {requests && requests.length === 0 && (
          <p className="text-gray-500">No connections yet</p>
        )}

       
        <div className="space-y-4">
          {requests &&
            requests.map((item) => (
              <Connection
                key={item._id}   
                connectionData={item.fromId}
                variant="requests"
                requestID={item._id}
              />
            ))}
        </div>

      </div>
    </div>
  );
};

export default Requests;