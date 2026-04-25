import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { logout } from "../utils/userSlice";
import { useNavigate } from "react-router";
const Home = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    async function handleLogout() {
        try {
            console.log("logout");
            await axios.post(`${BASE_URL}user/logout`, {}, {
                withCredentials: true,
            });
            dispatch(logout());
            navigate("/login");
        } catch (error) {
            console.log(error);
            dispatch(logout());
        }

    }
    return (
        <div>
            <h1>Home</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Home;