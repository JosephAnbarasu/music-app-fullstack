import React, { useEffect, useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import DisplayHome from "./DisplayHome";
import DisplayAlbum from "./DisplayAlbum";
import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

const Display = () => {
  const { albumsData } = useContext(PlayerContext);
  const displayRef = useRef();
  const location = useLocation();
  const isAlbum = location.pathname.includes("album");
  const albumId = isAlbum ? location.pathname.split("/").pop() : "";
  const album = albumsData.find((x) => x._id === albumId);
  const bgColor =
    isAlbum && album ? album.bgColor : "linear-gradient(#7209b7,#3f37c9)";

  useEffect(() => {
    if (isAlbum) {
      displayRef.current.style.background = `linear-gradient(${bgColor},#3f37c9)`;
    } else {
      displayRef.current.style.background = `linear-gradient(#7209b7,#3f37c9)`;
    }
  });

  return (
    <div
      ref={displayRef}
      className="w-[100%] m-2 px-6 pt-4 rounded bg-[#372554] text-[#ffe0e9] overflow-auto lg:w-[75%] lg:ml-0"
    >
      {albumsData.length > 0 ? (
        <Routes>
          <Route path="/" element={<DisplayHome />} />
          <Route
            path="/album/:id"
            element={
              <DisplayAlbum album={albumsData.find((x) => x._id == albumId)} />
            }
          />
        </Routes>
      ) : null}
    </div>
  );
};

export default Display;
