import { Link, useLocation,useNavigate } from "react-router";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { logout } from "../utils/userSlice";
import { useDispatch } from "react-redux";
const Navbar = () => {
  const location = useLocation();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
     
      await axios.post(`${BASE_URL}user/logout`, {}, {
        withCredentials: true,
      });
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
     
    }

  }
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="navbar  h-16  px-8">
        <div className="navbar-start">
          <Link
            className="group flex items-center transition-opacity duration-300 hover:opacity-70"
            to="/"
          >
            {/* <img
              src="src/assets/Logo.png"
              className="h-8 w-auto"
              alt="Logo"
            /> */}
           <h1 className="text-xl font-medium">PU</h1> 
          </Link>
        </div>

        {user && (
          <div className="navbar-center hidden md:flex">
            <ul className="menu menu-horizontal gap-1 p-0">
              {[
                { label: "Requests", path: "/requests" },
                { label: "Connections", path: "/connections" },
                { label: "Chat", path: "/chat" },
                { label: "Feed", path: "/feed" }
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      location.pathname === item.path
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="navbar-end gap-2">
          {location.pathname === "/connections" && (
            <button className="btn btn-ghost btn-circle btn-sm hover:bg-gray-100 transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          )}

          <div className="dropdown dropdown-end">
            <button
              tabIndex={0}
              className="btn btn-ghost btn-circle btn-sm hover:bg-gray-100 transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </button>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-white rounded-xl shadow-lg border border-gray-100 p-2 w-48 mt-2 animate-in fade-in slide-in-from-top-2 duration-200"
            >
              <li>
                <Link
                  to="/"
                  className="text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                >
                  Homepage
                </Link>
              </li>
          
              <li>
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                  >
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
};
export default Navbar;


