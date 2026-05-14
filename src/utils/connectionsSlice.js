import { createSlice } from "@reduxjs/toolkit";

const connectionSlice=createSlice({
    name:"connections",
    initialState:{
        data:[],
        loading:false,
        loaded:false,
        error:null,
    },
    reducers:{
        initConnections:(state,action)=>{
            state.data= action.payload;
            state.loaded=true;
        }
    }
})
export const {initConnections}=connectionSlice.actions;
export default connectionSlice.reducer;