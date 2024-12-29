import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContent } from "../context/AppContext";

const Header = () => {
  const { userData } = useContext(AppContent);

  return (
    <div className="flex flex-col items-center mt-20 px-4 text-center text-gray-800">
      <img
        src={assets.header_img}
        alt=""
        className="w-36 h-36 rounded-full mb-6"
      />
      <h1 className="flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2">
        Hii {userData ? userData.name : "Coding Star"}!
        <img src={assets.hand_wave} className="w-8 aspect-square" alt="" />
      </h1>

      <h2 className="text-3xl sm:text-5xl font-semibold mb-4">
        Welcome to Developers Group
      </h2>
      <p className="mb-8 max-w-md">
        Let's join our hands, start coding and be so consistent to complete a
        new product tour and we will have you up and running in no time
      </p>
      <button className="border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-100 transition-all">
        Get Started
      </button>
    </div>
  );
};

export default Header;
