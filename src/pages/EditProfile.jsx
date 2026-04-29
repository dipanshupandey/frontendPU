import React from "react";

const EditProfile = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-lg space-y-5">
        
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Edit Profile
        </h2>

        {/* Input Field */}
        {[
          { label: "First Name", placeholder: "Enter first name" },
          { label: "Last Name", placeholder: "Enter last name" },
          { label: "Photo URL", placeholder: "Paste image link" },
          { label: "About", placeholder: "Tell something about yourself" },
          { label: "Skills", placeholder: "e.g. React, Node, ML" },
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
            />
          </div>
        ))}

        {/* Button */}
        <button
          className="w-full bg-black text-white py-2.5 rounded-xl 
          hover:bg-gray-900 active:scale-95 transition-all duration-200"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditProfile;