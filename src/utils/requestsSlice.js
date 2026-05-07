import { createSlice } from "@reduxjs/toolkit";

const request=createSlice({
name:"requests",
initialState:[],
reducers:{
    setRequests:(state,action)=>{
        return action.payload;
    },
    removeRequest:(state,action)=>{
        return state.filter((item)=>item._id!==action.payload);
    }
}
});

export const {setRequests,removeRequest}=request.actions;
export default request.reducer;