import Navbar from "./components/Navbar";
import { Outlet } from "react-router";

const app=()=>{
  return (
    <div>
  <Navbar/>
  <Outlet/>
  </div>

  )
}
export default app;