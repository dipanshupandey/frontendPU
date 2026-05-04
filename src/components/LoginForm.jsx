import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [newUser, setNewUser] = useState(true);
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const handleLoginClick = async () => {
        try {

            const res = await axios.post(BASE_URL + 'user/login', {
                email: email,
                password: password
            }, { withCredentials: true });

            dispatch(login(res.data.data));
            Navigate("/");
        } catch (error) {
            setError(error?.response?.data?.message || "Something went wrong");

        }
    }
    const handleSignupClick=async()=>{
        try {
            const res=await axios.post(BASE_URL+'user/signup',{
                firstName,
                lastName,
                age,
                gender,
                email,
                password
            },{
                withCredentials:true
            });
            // console.log(res);
            dispatch(login(res.data.data));
            Navigate("/edit");
        } catch (error) {
            setError(error?.response?.data?.message || "Something went wrong");
        }
    }
    const handleSubmit=()=>{
        if(newUser)
            handleSignupClick();
        else
            handleLoginClick();
    }
    return (
        <div className="">
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">{newUser?"Sign up":"Login"}</legend>

                {newUser&&<>
                    <label className="label">First name</label>
                <input type="text" className="input" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />

                <label className="label">Last name</label>
                <input type="text" className="input" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />

                <label className="label">Age</label>
                <input type="number" className="input" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />

                <div className=" w-full">
                    <label className="label">Select gender</label>

                    <select
                        className="select select-bordered w-full"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="">-- Select --</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="others">Others</option>

                    </select>
                </div>
                </>
                }
                <label className="label">Email</label>
                <input type="email" className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

                <label className="label">Password</label>
                <input type="password" className="input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <p className="text-sm text-gray-500 mt-4 text-center">
                    {newUser ? "Already have an account?" : "Create account?"}{" "}
                    <span
                        className="
                    text-gray-900
                    font-medium
                    cursor-pointer
                    hover:underline
                    transition
                    "
                    onClick={()=>setNewUser(!newUser)}
                    >
                        {newUser ? "Login" : "Sign up"}
                    </span>
                </p>

                {error && (
                    <p className="text-red-400 text-xs mt-1">
                        {error}
                    </p>
                )}
                <button className="btn btn-neutral mt-4" onClick={handleSubmit}>{newUser?"Sign up":"Login"}</button>
            </fieldset>
        </div>
    )
}
export default LoginForm;