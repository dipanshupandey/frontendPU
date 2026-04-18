import Navbar from "./components/Navbar";
import { Outlet } from "react-router";

const app=()=>{
  return (
    <div className="">
  <Navbar/>
  <Outlet/>
  </div>

  )
}
export default app;