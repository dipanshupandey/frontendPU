import Navbar from "./components/Navbar";
import { Outlet, useNavigate } from "react-router";
import { BASE_URL } from "./utils/constants";
import axios from "axios";
import { useDispatch ,useSelector} from "react-redux";
import { login } from "./utils/userSlice";
import { initConnections } from "./utils/connectionsSlice";
import { useEffect } from "react";
const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user= useSelector((store)=>store.user);
  const connections=useSelector((store)=>store.connections);
  const fetchUser = async () => {

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

  const getConnections=async ()=>{
    try {
      const res=await axios.get(BASE_URL+"user/connections",{withCredentials:true});
   
      dispatch(initConnections(res.data.data));
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
  
    if(user) return;
    fetchUser();
    
  }, [user]);

  useEffect(()=>{
    if(user&&!connections.length)
      getConnections();
  },[user,connections]);

  return (
    <div className="">
      <Navbar />
      <Outlet />
    </div>

  )
}
export default App;