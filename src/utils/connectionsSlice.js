import { createSlice } from "@reduxjs/toolkit";

const connectionSlice=createSlice({
    name:"connections",
    initialState:[],
    reducers:{
        initConnections:(state,action)=>{
            return action.payload;
        }
    }
})
export const {initConnections}=connectionSlice.actions;
export default connectionSlice.reducer;