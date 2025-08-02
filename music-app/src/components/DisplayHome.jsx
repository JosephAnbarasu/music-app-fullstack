import React from "react";
import Navbar from "./Navbar";
import Albumitem from "./Albumitem";
import Songitem from "./Songitem";
import { useContext, useState } from "react";
import { PlayerContext } from "../context/PlayerContext";

const Displayhome = () => {
  const { songsData, albumsData } = useContext(PlayerContext);
  const [selectedCategory, setSelectedCategory] = useState("all");
  return (
    <>
      <Navbar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      {(selectedCategory === "all" || selectedCategory === "songs") && (
        <div className="mb-4">
          <h1 className="my-5 font-bold text-2xl">Songs</h1>
          <div className="flex overflow-auto">
            {songsData.map((item, index) => (
              <Songitem
                key={index}
                name={item.name}
                artist={item.artist}
                image={item.image}
                id={item._id}
              />
            ))}
          </div>
        </div>
      )}

      {/* Show Playlists */}
      {(selectedCategory === "all" || selectedCategory === "playlists") && (
        <div className="mb-4">
          <h1 className="my-5 font-bold text-2xl">Playlists</h1>
          <div className="flex overflow-auto">
            {albumsData.map((item, index) => (
              <Albumitem
                key={index}
                name={item.name}
                id={item._id}
                image={item.image}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Displayhome;
