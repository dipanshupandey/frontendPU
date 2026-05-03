import { createSlice } from "@reduxjs/toolkit";

const request=createSlice({
name:"requests",
initialState:[],
reducers:{
    setRequests:(state,action)=>{
        return action.payload;
    }
}
});

export const {setRequests}=request.actions;
export default request.reducer;