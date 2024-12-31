import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContent } from "../context/AppContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Header = () => {
  const { userData } = useContext(AppContent);
  const navigate = useNavigate(); // Initialize navigate

  return (
    <div className="flex flex-col items-center mt-20 px-4 text-center text-gray-800">
      <img
        src={assets.header_img}
        alt=""
        className="w-36 h-36 rounded-full mb-6"
      />
      <div class="fixed top-60 right-10 z-50">
        <button
          onClick={() => navigate("/task")}
          class="rounded-tl-xl bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 
          px-5 py-2 text-white-500 text-lg transform transition-all
           duration-500 hover:scale-110 hover:shadow-2xl hover:bg-cyan-300
            hover:text-white hover:rotate-6 hover:animate-pulse"
        >
          Task Organizer
        </button>
      </div>

      <h1 className="flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2">
        Hii {userData ? userData.name : "Coding Star"}!
        <img src={assets.hand_wave} className="w-8 aspect-square" alt="" />
      </h1>

      <h2 className="text-3xl sm:text-5xl font-semibold mb-4">
        Welcome to Developers Group
      </h2>
      <p className="mb-8 max-w-md">
        We are a Software as a Service (SaaS) company, providing robust
        authentication, authorization, user management , task organiztion like
        ToDo Task Organization.{}
        <span onClick={() => navigate("/todointro")} className="cursor-pointer text-red-600 font-bold underline">
          Coding Stars
        </span>
      </p>
      <button
        onClick={() => navigate("/get-started")}
        className="border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-100 transition-all"
      >
        Get Started
      </button>
    </div>
  );
};

export default Header;
