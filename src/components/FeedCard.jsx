import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router';
import { BASE_URL } from '../utils/constants';
import { removeProfile } from '../utils/feedslice';
import { useDispatch } from 'react-redux';

const FeedCard = ({ user, variant }) => {

  const { firstName, lastName, about, skills = [], photoURL, gender, age, _id } = user;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleEditProfile() {
    navigate("/edit");
  }

  async function sendRequest(status, id) {
    try {
      const res = await axios.post(BASE_URL + `request/send/${status}/${id}`, {}, { withCredentials: true });
      console.log(res);
      dispatch(removeProfile(id));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-[350px] h-[560px] rounded-3xl overflow-hidden flex flex-col bg-white ring-1 ring-black/5 shadow-sm">

     
      <div className="h-full w-full overflow-hidden">
        <img
          src={photoURL}
          alt="profile"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4 px-5 py-4">

        {/* Name */}
        <h2 className="text-[22px] font-semibold tracking-tight text-gray-900">
          {firstName} {lastName}{age ? `, ${age}` : ""}
        </h2>

        {/* About */}
        {about && (
          <div>
            <p className="mb-1 text-xs text-gray-400">About me</p>
            <p className="text-sm leading-relaxed text-gray-700 line-clamp-2">
              {about}
            </p>
          </div>
        )}

        {/* Interests */}
        {skills.length > 0 && (
          <div>
            <p className="mb-1 text-xs text-gray-400">Interests</p>
            <p className="text-sm text-gray-700">{skills.slice(0, 4).join(" • ")}</p>
          </div>
        )}

        {/* Actions */}
        {variant === "feed" && (
          <div className="mt-1 flex items-center justify-center gap-20">
            <button
              onClick={() => sendRequest("skipped", _id)}
              aria-label="Skip"
              className="flex h-12 w-12 items-center justify-center rounded-full text-lg text-gray-400 ring-1 ring-gray-200 transition-colors duration-200 hover:text-gray-700"
            >
              ✕
            </button>
            <button
              onClick={() => sendRequest("interested", _id)}
              aria-label="Like"
              className="flex h-12 w-12 items-center justify-center rounded-full text-lg text-gray-500 ring-1 ring-gray-200 transition-colors duration-200 hover:text-gray-900"
            >
              ♥
            </button>
          </div>
        )}

        {variant === "profile" && (
          <button
            onClick={handleEditProfile}
            className="mt-1 text-sm font-medium text-gray-800 transition-opacity duration-200 hover:opacity-70"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  )
}

export default FeedCard