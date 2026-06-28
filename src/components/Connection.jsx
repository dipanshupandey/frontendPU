import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { removeRequest } from "../utils/requestsSlice";
import { setSelectedConversationId } from "../utils/conversationSlice";
import { useNavigate } from "react-router";

const DEFAULT_AVATAR = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

const Connection = ({ connectionData, variant, requestID = null }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const conversations = useSelector((store) => store.conversations.data);

  if (!connectionData) return null;

  const {
    firstName = "",
    lastName = "",
    gender = "",
    photoURL = "",
    _id = "",
  } = connectionData;

  // Open (or create) the conversation with this connection, then jump to chat.
  async function openChat() {
    // A matched connection already has a conversation loaded in the store.
    let conversation = conversations.find((c) =>
      c?.participants?.some((p) => p?._id === _id)
    );
    let conversationId = conversation?._id;

    // Fallback for the rare case it isn't in the store yet.
    if (!conversationId) {
      try {
        const res = await axios.post(
          BASE_URL + "conversation/create",
          { participant2: _id },
          { withCredentials: true }
        );
        conversationId = res.data?.data?._id ?? res.data?._id;
      } catch (error) {
        console.log(error);
        return;
      }
    }

    if (!conversationId) return;
    dispatch(setSelectedConversationId(conversationId));
    navigate("/chat");
  }

  async function reviewRequest(status, id) {
    try {
      await axios.post(
        BASE_URL + `request/review/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(id));

      // Only spin up a conversation + open chat when the request is accepted.
      if (status === "matched") {
        const res = await axios.post(
          BASE_URL + "conversation/create",
          { participant2: _id },
          { withCredentials: true }
        );
        const conversationId = res.data?.data?._id ?? res.data?._id;
        if (conversationId) dispatch(setSelectedConversationId(conversationId));
        navigate("/chat");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="group bg-white rounded-2xl px-4 py-3.5 flex items-center gap-4 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100 ring-1 ring-gray-100 shrink-0">
        <img
          src={photoURL || DEFAULT_AVATAR}
          alt={firstName || "Profile"}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h2 className="text-[15px] font-semibold text-gray-900 truncate tracking-tight">
          {firstName} {lastName}
        </h2>
        {gender && (
          <p className="text-[13px] text-gray-400 mt-0.5 capitalize truncate">
            {gender}
          </p>
        )}
      </div>

      {variant === "connections" ? (
        <button
          onClick={openChat}
          className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-gray-900 text-white text-[13px] font-medium px-4 py-2 hover:bg-gray-700 active:scale-95 transition-all duration-200"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4-.8L3 20l1.3-3.9A7.96 7.96 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          Message
        </button>
      ) : (
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => reviewRequest("rejected", requestID)}
            aria-label="Pass"
            className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 text-gray-400 hover:text-gray-600 hover:border-gray-300 active:scale-90 transition-all duration-200"
          >
            ✕
          </button>
          <button
            onClick={() => reviewRequest("matched", requestID)}
            aria-label="Like"
            className="w-10 h-10 rounded-full flex items-center justify-center bg-rose-50 text-rose-500 hover:bg-rose-100 active:scale-90 transition-all duration-200 text-lg"
          >
            ♥
          </button>
        </div>
      )}
    </div>
  );
};

export default Connection;
