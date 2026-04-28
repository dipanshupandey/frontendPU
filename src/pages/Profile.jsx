import { useEffect } from "react";

import FeedCard from "../components/FeedCard";
import { useSelector } from "react-redux";
import {login} from "../utils/userSlice";

const Profile=  ()=>{
    
    const user=useSelector((store)=>store.user);
    console.log(user);
    return ( 
        <div className="flex items-center justify-center mt-36">
        <FeedCard user={user?user:{}} variant="profile" />
        </div>
        )
}
export default Profile;