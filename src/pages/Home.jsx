import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { logout } from "../utils/userSlice";
import { useNavigate } from "react-router";
const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
       <div className="hero min-h-screen relative overflow-hidden">

  {/* Background Video */}
  <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute top-0 left-0 w-full h-full object-cover"
  >
    <source src="/bg1.mp4" type="video/mp4" />
  </video>

  {/* Overlay (important for readability) */}
  <div className="hero-overlay bg-black/40 absolute inset-0"></div>

  {/* Content */}
  <div className="hero-content text-neutral-content text-center relative z-10">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
      <p className="mb-5">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
      </p>
      <button className="btn btn-primary">Get Started</button>
    </div>
  </div>

</div>
    )
}

export default Home;