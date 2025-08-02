import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-[25%] h-full p-2 flex-col gap-2 text-[#ffe0e9] hidden lg:flex">
      <div className="bg-[#560bad] h-[15%] rounded flex flex-col justify-around">
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 pl-8 cursor-pointer"
        >
          <img className="w-6" src={assets.home_icon} alt="" />
          <p className="font-bold">Home</p>
        </div>
        <div className="flex items-center gap-3 pl-8 cursor-pointer">
          <img className="w-6" src={assets.search_icon} alt="" />
          <p className="font-bold">Search</p>
        </div>
      </div>
      <div className="bg-[#560bad] h-[85%] rounded">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img className="w-8" src={assets.stack_icon} alt="" />
            <p className="font-semibold">Your Library</p>
          </div>
          <div className="flex items-center gap-3">
            <img className="w-5" src={assets.arrow_icon} alt="" />
            <img className="w-5" src={assets.plus_icon} alt="" />
          </div>
        </div>
        <div className="p-4 bg-[linear-gradient(#4895ef,#3f37c9)] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4">
          <h1 className="text-[#ffe0e9]">Create your first playlist</h1>
          <p className="font-light text-[#ffe0e9]">
            It's easy we will help you
          </p>
          <button className="px-4 py-1.5 bg-[#4895ef] text-[15px] text-[#ffe0e9] rounded-full mt-4">
            Create Playlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
