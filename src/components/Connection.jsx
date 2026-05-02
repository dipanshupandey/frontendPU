import React from "react";

const Connection = ({ connectionData }) => {
  if (!connectionData) return null;

  const {
    firstName = "",
    lastName = "",
    gender = "",
    photoURL = "",
  } = connectionData;

  return (
    <div className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition duration-300 border border-gray-100">
      
      <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
        <img
          src={photoURL || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1">
        <h2 className="text-base font-semibold text-gray-900 tracking-tight">
          {firstName} {lastName}
        </h2>

        <p className="text-sm text-gray-500 mt-0.5">
          {gender}
        </p>
      </div>

      <button className="text-sm text-gray-400 hover:text-gray-700 transition">
        Chat
      </button>

    </div>
  );
};

export default Connection;