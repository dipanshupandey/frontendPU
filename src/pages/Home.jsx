import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch ,useSelector} from "react-redux";
import { logout } from "../utils/userSlice";
import { useNavigate } from "react-router";


const Home = () => {
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
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
    function handleGetStarted(){
      if(user){
        navigate("/feed");
      }
      else{
        navigate("/login");
      }

    }
    return (
       <div className="hero min-h-screen relative overflow-hidden">
<span className="loading loading-infinity loading-xl"></span>
  {/* Background Video */}
  <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute top-0 left-0 w-full h-full object-cover"
  >
    <source src="/bg2.mp4" type="video/mp4" />
  </video>

  {/* Overlay (important for readability) */}
  <div className="hero-overlay bg-black/20 absolute inset-0"></div>

  {/* Content */}
  <div className="hero-content text-neutral-content text-center relative z-10">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">Pair Up</h1>
      <p className="mb-5">
        Where friendships, ideas, and collaborations come together.
        <br/>
Join a community of people who love to connect, create, and support each other. Find new friends, collaborate on exciting projects, and turn great ideas into reality with Pair Up.

      </p>
      <button className="btn btn-primary"
      onClick={handleGetStarted}
      >Get Started</button>
    </div>
  </div>

</div>
    )
}

export default Home;