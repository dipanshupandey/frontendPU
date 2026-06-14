import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import FeedCard from "../components/FeedCard";
import FeedShimmer from "../components/Shimmer";
import NoOneAround from "../components/NoOneAround";
import { useDispatch,useSelector } from "react-redux";
import { addFeed } from "../utils/feedslice";

const Feed=  ()=>{
    const dispatch=useDispatch();
    const feedArr=useSelector((store)=>store.feed);
    const [loading,setLoading]=useState(true);

    async function getFeed()
    {
        try {
            setLoading(true);
            const res= await axios.get(BASE_URL+"user/feed",{
                withCredentials:true
            });
            dispatch(addFeed(res.data));
            // console.log(res);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(()=>
    {
        getFeed();
    },[]);
    return (
        <div className="flex items-center justify-center mt-[5%]">
        {
        loading
            ? <FeedShimmer/>
            : feedArr.length>0
                ? <FeedCard user={feedArr[0]} variant="feed"/>
                : <NoOneAround onRefresh={getFeed}/>
        }
        </div>
        )
}
export default Feed;