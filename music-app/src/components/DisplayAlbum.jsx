import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";
import axios from "axios";
import { toast } from "react-toastify";
import { url } from "../App";

const DisplayAlbum = () => {
  const { playWithId, albumsData, songsData } = useContext(PlayerContext);
  const { id } = useParams();
  const [albumData, setAlbumData] = useState(null);
  const [albumSongs, setAlbumSongs] = useState([]);

  const handleRemoveFromAlbum = async (songId) => {
    try {
      const res = await axios.post(`${url}/api/song/update`, {
        id: songId,
        albumId: null,
      });
      if (res.data.success) {
        toast.success("Removed from album");
        setAlbumSongs((prev) => prev.filter((song) => song._id !== songId));
      } else {
        toast.error("Failed to remove");
      }
    } catch (err) {
      toast.error("Error occurred");
    }
  };

  useEffect(() => {
    const matchedAlbum = albumsData.find((item) => item._id === id);
    if (matchedAlbum) {
      setAlbumData(matchedAlbum);
    }
  }, [id, albumsData]);

  useEffect(() => {
    const filtered = songsData.filter((song) => song.albumId === id);
    setAlbumSongs(filtered);
  }, [id, songsData]);

  return albumData ? (
    <>
      <Navbar />
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-center">
        <img className="w-48 rounded" src={albumData.image} alt="" />
        <div className="flex flex-col">
          <p>Playlist</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">
            {albumData.name}
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#EBE0F5]">
        <p>
          <b className="mr-4">#</b>Title
        </p>
        <p>Album</p>
        <p className="hidden sm:block">Date Added</p>
        <img className="m-auto w-4" src={assets.clock_icon} alt="" />
      </div>
      <hr />
      {albumSongs.map((item, index) => (
        <div
          key={index}
          onClick={() => playWithId(item._id)}
          className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#EBE0F5] hover:bg-[#ffffff2b] cursor-pointer"
        >
          <p className="text-[#EBE0F5]">
            <b className="mr-4 text-[#EBE0F5]">{index + 1}</b>
            <img className="inline w-10 mr-5" src={item.image} alt="" />
            {item.name}
          </p>
          <p className="text-[#15px]">{albumData.name}</p>
          <p className="text-[#15px] hidden sm:block">5 days ago</p>
          <div className="flex justify-center gap-2 items-center">
            <p>{item.duration || "2:45"}</p>
            <button
              onClick={(e) => {
                e.stopPropagation(); // ⛔ don't play when removing
                handleRemoveFromAlbum(item._id);
              }}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </>
  ) : null;
};

export default DisplayAlbum;
