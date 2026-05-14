import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedslice";
import connectionReducer from "./connectionsSlice";
import requestReducer from "./requestsSlice";
import conversationReducer from "./conversationSlice";
const store=configureStore({
    reducer:{
        user:userReducer,
        feed:feedReducer,
        connections:connectionReducer,
        requests:requestReducer,
        conversations:conversationReducer,
    }

});
export default store;
