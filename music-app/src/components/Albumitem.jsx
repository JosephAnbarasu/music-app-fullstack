import React from "react";
import { useNavigate } from "react-router-dom";

const Albumitem = ({ image, name, id }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/album/${id}`)}
      className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]"
    >
      <div className="w-40 h-40 overflow-hidden rounded">
        <img className="w-full h-full object-cover" src={image} alt={name} />
      </div>
      <p className="font-bold mt-2 mb-1">{name}</p>
    </div>
  );
};

export default Albumitem;
