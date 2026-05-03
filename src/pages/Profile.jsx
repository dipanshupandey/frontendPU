import { useEffect } from "react";

import FeedCard from "../components/FeedCard";
import { useSelector } from "react-redux";
import { login } from "../utils/userSlice";

const Profile = () => {

    const user = useSelector((store) => store.user);

    return (
        <div>
            <div className=" w-[20%] mx-auto mt-9">
                <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
                    Your Space
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Showcase who you are 
                </p>
            </div>
            <div className="flex items-center justify-center mt-36">

                <FeedCard user={user ? user : {}} variant="profile" />
            </div>
        </div>
    )
}
export default Profile;