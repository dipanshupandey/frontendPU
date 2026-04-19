import { useState } from "react";
import axios from "axios";

const LoginForm = () => {
    const [email,setEmail]=useState("bhch!23@gmail.com");
    const [password,setPassword]=useState("dipanshu@123");
    const handleLoginClick=async ()=>{
        try {
            const res=await axios.post('http://localhost:5050/user/login',{
            email:"bhch!23@gmail.com",
            password:"dipanshu@123"
        },{withCredentials:true});
        } catch (error) {
         console.log(error);
         alert("Invalid credentials");  
        }
    }
    return (
        <div className="">
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">Login</legend>

                <label className="label">Email {email}</label>
                <input type="email" className="input" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>

                <label className="label">Password {password}</label>
                <input type="password" className="input" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />

                <button className="btn btn-neutral mt-4" onClick={()=>handleLoginClick()}>Login</button>
            </fieldset>
        </div>
    )
}
export default LoginForm;