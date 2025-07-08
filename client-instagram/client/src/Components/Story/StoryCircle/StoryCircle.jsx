import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { findStoryByUserId } from "../../../Redux/Story/Action";

const StoryCircle = ({ image, username, userId }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`story/${userId}`);
  };

  
  return (
    <div className="cursor-pointer flex flex-col items-center hover:opacity-80 transition-opacity duration-200" onClick={handleNavigate}>
      <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-r from-yellow-400 to-pink-600">
        <img className="w-full h-full rounded-full border-2 border-white dark:border-gray-800" src={image} alt="" />
      </div>
      <p className="text-xs mt-1 text-black dark:text-gray-100">
        {username?.length > 9 ? username.substring(0, 9) + "..." : username}
      </p>
    </div>
  );
};

export default StoryCircle;
