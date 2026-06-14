import FeedCard from "../components/FeedCard";
import { useSelector } from "react-redux";

const Profile = () => {

    const user = useSelector((store) => store.user);

    return (
        <div className="mx-auto w-[350px] px-1 pt-8 pb-12">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-[28px] font-semibold leading-tight tracking-tight text-gray-900">
                    Your Space
                </h1>
                <p className="mt-1 text-[15px] text-gray-500">
                    Showcase who you are
                </p>
            </div>

            {/* Card */}
            <FeedCard user={user ? user : {}} variant="profile" />
        </div>
    )
}
export default Profile;