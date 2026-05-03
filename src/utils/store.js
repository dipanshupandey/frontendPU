import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedslice";
import connectionReducer from "./connectionsSlice";
import requestReducer from "./requestsSlice";
const store=configureStore({
    reducer:{
        user:userReducer,
        feed:feedReducer,
        connections:connectionReducer,
        requests:requestReducer,
    }

});
export default store;
