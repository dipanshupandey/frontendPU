import React from "react";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router";
import { useSelector,useDispatch } from "react-redux";
import { login } from "../utils/userSlice";

const EditProfile = () => {
  const user=useSelector(store=>store.user);
  console.log("select",user);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [firstName, setFirstName] = useState(user?.firstName||"");
  const [lastName, setlastName] = useState(user?.lastName||"");
  const [about, setabout] = useState(user?.about||"");
  const [skills, setSkills] = useState(user?.skills||"");
  const [photoURL, setPhotoURL] = useState(user?.photoURL||"");
  async function handleEditClick() {
    try {
     
      const res=await axios.patch(BASE_URL+"profile/update",{firstName,lastName,about,skills,photoURL},{withCredentials:true});
      // console.log("===>",res);
      dispatch(login(res.data.data));
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md p-6 rounded shadow-lg space-y-5">

        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Edit Profile
        </h2>


        {[
          { label: "First Name", placeholder: "Enter first name", func: (e) => setFirstName(e.target.value), value: firstName },
          { label: "Last Name", placeholder: "Enter last name", func: (e) => { setlastName(e.target.value) }, value: lastName },
          { label: "Photo URL", placeholder: "Paste image link", func: (e) => setPhotoURL(e.target.value), value: photoURL },
          { label: "About", placeholder: "Tell something about yourself", func: (e) => setabout(e.target.value), value: about },
          { label: "Skills", placeholder: "e.g. React, Acting, Math", func: (e) => setSkills(e.target.value), value: skills },
        ].map((field, index) => (
          <div key={index} className="flex flex-col space-y-1">

            <label className="text-sm text-gray-600">
              {field.label}
            </label>
            <input
              type="text"
              placeholder={field.placeholder}
              className="px-4 py-2 rounded-xl border border-gray-200 
              focus:outline-none focus:ring-2 focus:ring-black/80 
              transition-all duration-200"
              onChange={field.func}
              value={field.value}
            />
          </div>
        ))}


        <button
          className="w-full bg-black text-white py-2.5 rounded-xl 
          hover:bg-gray-900 active:scale-95 transition-all duration-200"
          onClick={handleEditClick}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditProfile;