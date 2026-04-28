import Navbar from "./components/Navbar";
import { Outlet, useNavigate } from "react-router";
import { BASE_URL } from "./utils/constants";
import axios from "axios";
import { useDispatch ,useSelector} from "react-redux";
import { login } from "./utils/userSlice";
import { useEffect } from "react";
const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user= useSelector((store)=>store.user);
  const fun = async () => {

    try {
      const res = await axios.get(BASE_URL+"profile", { withCredentials: true });
      dispatch(login(res.data));
    } catch (error) {
      if (error?.response?.status === 401) {
        navigate("/login");
      }
      console.log(error);
    }
  }
  useEffect(() => {
    
    if(user) return ;
    
    fun();
  }, [user]);
  return (
    <div className="">
      <Navbar />
      <Outlet />
    </div>

  )
}
export default App;