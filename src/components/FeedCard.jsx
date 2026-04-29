import React from 'react'
import { useNavigate } from 'react-router';
const FeedCard = ({ user,variant }) => {
  const { firstName, lastName, about, skills = [], photoURL, gender, age } = user;
  const navigate=useNavigate();

  function handleEditProfile(){
    navigate("/edit");
  }

  return (
    <div className="w-[350px] h-[560px] bg-white rounded-3xl shadow-sm overflow-hidden flex flex-col">

      {/* Image */}
      <div className="h-full w-full p-2">
        <img
          src={photoURL}
          alt="profile"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-1 px-5 py-4 flex flex-col justify-between">

        {/* Top Content */}
        <div className="space-y-3">

          {/* Name */}
          <h2 className="text-[22px] font-semibold text-gray-900 tracking-tight">
            {firstName} {lastName}{age ? `, ${age}` : ""}
          </h2>

         
          <div>
            <p className="text-xs text-gray-400 mb-1">
              About me
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              {about}
            </p>
          </div>

          {/* Skills as inline context (not feature) */}
          {skills.length > 0 && (
            <div>
              <p className="text-xs text-gray-400 mb-1">
                Interests
              </p>
              <p className="text-sm text-gray-700">
                {skills.slice(0, 4).join(" • ")}
              </p>
            </div>
          )}
        </div>

        {/* Bottom Actions */}
        {
          variant==="feed"&&
          <div className="flex justify-center items-center gap-52 pt-3">
            <button className="text-gray-300 hover:text-gray-700 transition text-3xl">
              ✕
            </button>
            <button className="text-gray-300 hover:text-gray-900 transition text-3xl">
              ♥
            </button>
          </div>
        }
        {
          variant==="profile"&&<button onClick={handleEditProfile} className="text-gray-800 font-medium hover:opacity-70 transition">
  Edit Profile
</button>
        }
      </div>
    </div>
  )
}

export default FeedCard