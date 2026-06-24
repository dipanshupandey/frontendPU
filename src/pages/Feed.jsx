import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import FeedCard from "../components/FeedCard";
import FeedShimmer from "../components/Shimmer";
import NoOneAround from "../components/NoOneAround";
import { useDispatch,useSelector } from "react-redux";
import { addFeed } from "../utils/feedslice";

const Feed = () => {
    const dispatch = useDispatch();
    const feedArr = useSelector((store) => store.feed);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    async function getFeed() {
        try {
            setLoading(true);
            const res = await axios.get(BASE_URL + "user/feed", {
                withCredentials: true,
                params: { page, limit: 10 }
            });
            const { data } = res.data;
            dispatch(addFeed(data));
            console.log(data);
            if (data.length === 0) setHasMore(false);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getFeed();
    }, [page]);

    // When all profiles on the current page are swiped, fetch the next page
    useEffect(() => {
        if (!loading && feedArr.length === 0 && hasMore) {
            setPage((prev) => prev + 1);
        }
    }, [feedArr, loading]);

    function handleRefresh() {
        setPage(1);
        setHasMore(true);
        getFeed();
    }

    return (
        <div className="flex items-center justify-center mt-[5%]">
            {loading
                ? <FeedShimmer />
                : feedArr.length > 0
                    ? <FeedCard user={feedArr[0]} variant="feed" />
                    : <NoOneAround onRefresh={handleRefresh} />
            }
        </div>
    );
};
export default Feed;