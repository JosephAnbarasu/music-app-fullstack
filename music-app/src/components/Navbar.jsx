import React from "react";
import "../assets/assets.js";
import { assets } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";

const Navbar = ({ selectedCategory, setSelectedCategory }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-full flex justify-between items-center font-semibold">
        <div className="flex items-center gap-2">
          <img
            onClick={() => navigate(-1)}
            className="w-8 bg-[#3a0ca3] p-2 rounded-2xl cursor pointer"
            src={assets.arrow_left}
            alt=""
          />
          <img
            onClick={() => navigate(1)}
            className="w-8 bg-[#3a0ca3] p-2 rounded-2xl cursor pointer"
            src={assets.arrow_right}
            alt=""
          />
        </div>
        <div className="flex items-center gap-4">
          <p className="bg-[#560bad] text-[#ffe0e9] w-7 h-7 rounded-full flex items-center justify-center">
            J
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-4">
        {["all", "songs", "playlists"].map((category) => (
          <p
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-1 rounded-2xl cursor-pointer ${
              selectedCategory === category
                ? "bg-white text-black"
                : "bg-[#3a0ca3] text-[#ffe0e9]"
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </p>
        ))}
      </div>
    </>
  );
};

export default Navbar;
