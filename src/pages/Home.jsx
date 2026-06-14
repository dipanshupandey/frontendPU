import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch ,useSelector} from "react-redux";
import { logout } from "../utils/userSlice";
import { useNavigate } from "react-router";
import Reveal from "../components/Reveal";


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
      <div className="w-full bg-white">
        {/* ===== HERO ===== */}
        <section className="relative min-h-screen w-full overflow-hidden">
          {/* Background Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/bg1.mp4" type="video/mp4" />
          </video>

          {/* Cinematic overlay for contrast */}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-black/50" />

          {/* Content */}
          <div className="relative z-10 flex min-h-screen flex-col items-start justify-center px-8 sm:px-16 lg:px-24">
            <div className="max-w-2xl text-white">
              <h1 className="anim-rise text-6xl sm:text-7xl lg:text-8xl font-extrabold uppercase leading-[0.9] tracking-tight" style={{ animationDelay: "0.05s" }}>
                Build
                <br />
                together.
              </h1>

              <p className="anim-rise mt-6 max-w-lg text-lg sm:text-xl font-light text-white/80" style={{ animationDelay: "0.25s" }}>
                Pair Up connects like-minded people across every domain — to learn, create, and grow together.
              </p>

              <button
                onClick={handleGetStarted}
                className="anim-rise group mt-10 inline-flex items-center gap-2 rounded-full bg-white px-9 py-4 text-base font-semibold text-black transition-all duration-300 hover:bg-white/90 active:scale-95"
                style={{ animationDelay: "0.45s" }}
              >
                Get Started
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
            </div>
          </div>
        </section>

        {/* ===== STATEMENT ===== */}
        <section className="px-8 sm:px-16 lg:px-24 py-28 sm:py-36">
          <Reveal>
            <p className="max-w-4xl text-3xl sm:text-5xl font-semibold leading-tight tracking-tight text-gray-900">
              Tech, design, music, business, art —{" "}
              <span className="text-gray-400">collaboration has no boundaries.</span>
            </p>
          </Reveal>
        </section>

        {/* ===== MEDIA SPLIT — add photo/video here ===== */}
        <section className="grid grid-cols-1 md:grid-cols-2">
          {/* Media placeholder */}
          <Reveal className="order-2 md:order-1">
            <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden bg-gray-100 text-sm text-gray-400">
              {/* Drop your <img> or <video> here */}
                <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/bg3.mp4" type="video/mp4" />
          </video>
            </div>
          </Reveal>
          {/* Copy */}
          <Reveal delay={120} className="order-1 md:order-2">
            <div className="flex h-full flex-col justify-center px-8 sm:px-16 py-16">
              <h2 className="text-4xl sm:text-5xl font-bold uppercase tracking-tight text-gray-900">
                No gender.
                <br />
                No photos.
              </h2>
              <p className="mt-5 max-w-md text-lg font-light text-gray-500">
                We don't ask for your gender or pictures — so connections happen on ideas and intent, never appearance. Everyone gets a fair shot.
              </p>
            </div>
          </Reveal>
        </section>

        {/* ===== MEDIA SPLIT (reversed) — add photo/video here ===== */}
        <section className="grid grid-cols-1 md:grid-cols-2">
          {/* Copy */}
          <Reveal>
            <div className="flex h-full flex-col justify-center px-8 sm:px-16 py-16">
              <h2 className="text-4xl sm:text-5xl font-bold uppercase tracking-tight text-gray-900">
                Learn. Create.
                <br />
                Grow.
              </h2>
              <p className="mt-5 max-w-md text-lg font-light text-gray-500">
                Find collaborators who share your curiosity, swap skills across domains, and turn ideas into real work — together.
              </p>
            </div>
          </Reveal>
          {/* Media placeholder */}
          <Reveal delay={120}>
            <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden bg-gray-900 text-sm text-gray-500">
              {/* Drop your <img> or <video> here */}
               <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/bg2.mp4" type="video/mp4" />
          </video>
            </div>
          </Reveal>
        </section>

        {/* ===== FINAL CTA ===== */}
        <section className="px-8 py-32 text-center">
          <Reveal>
            <h2 className="text-5xl sm:text-7xl font-extrabold uppercase tracking-tight text-gray-900">
              Your move.
            </h2>
            <button
              onClick={handleGetStarted}
              className="group mt-10 inline-flex items-center gap-2 rounded-full bg-gray-900 px-10 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-black active:scale-95"
            >
              Get Started
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
          </Reveal>
        </section>
      </div>
    )
}

export default Home;