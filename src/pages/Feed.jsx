import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import FeedCard from "../components/FeedCard";
import { useDispatch,useSelector } from "react-redux";
import { addFeed } from "../utils/feedslice";

const Feed=  ()=>{
    const dispatch=useDispatch();
    const feedArr=useSelector((store)=>store.feed);
   
    async function getFeed()
    {
        try {
            const res= await axios.get(BASE_URL+"user/feed",{
                withCredentials:true
            });
            dispatch(addFeed(res.data));
            // console.log(res);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>
    {
        getFeed();
    },[]);
    return ( 
        <div className="flex items-center justify-center mt-[5%]">
        <FeedCard user={feedArr.length>2?feedArr[3]:{}} variant="feed"/>
        </div>
        )
}
export default Feed;