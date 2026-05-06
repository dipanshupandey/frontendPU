import {createSlice} from '@reduxjs/toolkit';

const feedSlice=createSlice({
    name:"feed",
    initialState:[],
    reducers:{
        addFeed:(state,action)=>{
            return action.payload;
        },
        removeProfile:(state,action)=>{
            return state.filter((profile)=>profile._id!==action.payload);
        }
    }
});
export const {addFeed,removeProfile}=feedSlice.actions;
export default feedSlice.reducer;