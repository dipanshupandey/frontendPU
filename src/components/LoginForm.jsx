import { useState } from "react";

const LoginForm = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    return (
        <div className="">
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">Login</legend>

                <label className="label">Email {email}</label>
                <input type="email" className="input" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>

                <label className="label">Password {password}</label>
                <input type="password" className="input" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />

                <button className="btn btn-neutral mt-4">Login</button>
            </fieldset>
        </div>
    )
}
export default LoginForm;