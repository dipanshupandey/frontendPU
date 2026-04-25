import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router";

const LoginForm = () => {
    const [email, setEmail] = useState("bhch!23@gmail.com");
    const [password, setPassword] = useState("dipanshu@123");
    const [error,setError]=useState(null);
    const dispatch=useDispatch();
    const Navigate=useNavigate();
    const handleLoginClick = async () => {
        try {
          
            const res = await axios.post(BASE_URL+'user/login', {
                email: "bhch!23@gmail.com",
                password: "dipanshu@123"
            }, { withCredentials: true });
            
            dispatch(login(res.data.data));
            Navigate("/");
        } catch (error) {
            setError(error?.response?.data?.message || "Something went wrong");
            
        }
    }
    return (
        <div className="">
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">Login</legend>

                <label className="label">Email</label>
                <input type="email" className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

                <label className="label">Password</label>
                <input type="password" className="input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                {error && (
  <p className="text-red-400 text-xs mt-1">
    {error}
  </p>
)}
                <button className="btn btn-neutral mt-4" onClick={() => handleLoginClick()}>Login</button>
            </fieldset>
        </div>
    )
}
export default LoginForm;