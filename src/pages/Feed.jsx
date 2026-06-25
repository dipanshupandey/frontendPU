import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import FeedCard from "../components/FeedCard";
import FeedShimmer from "../components/Shimmer";
import NoOneAround from "../components/NoOneAround";
import { useDispatch,useSelector } from "react-redux";
import { addFeed } from "../utils/feedslice";

const LIMIT = 10;

const Feed = () => {
    const dispatch = useDispatch();
    const feedArr = useSelector((store) => store.feed);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(null);

    const hasMore = total === null || page * LIMIT < total;

    async function getFeed() {
        try {
            setLoading(true);
            const res = await axios.get(BASE_URL + "user/feed", {
                withCredentials: true,
                params: { page, limit: LIMIT }
            });
            const { data, total: totalCount } = res.data;
            dispatch(addFeed(data));
            setTotal(totalCount);
           
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getFeed();
    }, [page]);

    useEffect(() => {
        if (!loading && feedArr.length === 0 && hasMore) {
            setPage((prev) => prev + 1);
        }
    }, [feedArr, loading]);

    function handleRefresh() {
        setTotal(null);
        setPage(1);
        // if page is already 1, the useEffect won't re-fire, so call directly
        if (page === 1) getFeed();
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