import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import FeedCard from "../components/FeedCard";
import { useDispatch,useSelector } from "react-redux";
import { addFeed } from "../utils/feedslice";
import noOneAround from "../assets/NoOneAround.png";

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
        {
        feedArr.length>0?<FeedCard user={feedArr[0]} variant="feed"/>:
      <div className="h-[60vh] sm:h-[70vh] md:h-[80vh] w-full flex justify-center items-center overflow-hidden">
  <img
    src={noOneAround}
    alt="No one around"
    className="max-h-full max-w-full object-contain"
  />
</div>
        }
        </div>
        )
}
export default Feed;