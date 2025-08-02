import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";
import axios from "axios";
import { toast } from "react-toastify";

const url = "http://localhost:4000";

const Player = () => {
  const {
    track,
    seekBar,
    seekBg,
    playStatus,
    play,
    pause,
    time,
    previous,
    next,
    seekSong,
    albumsData,
    setSongsData,
    audioRef,
  } = useContext(PlayerContext);

  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState("");
  const [volume, setVolume] = useState(1);

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleAlbumChange = async (e) => {
    const albumId = e.target.value;
    setSelectedAlbum(albumId);
    setShowDropdown(false);

    try {
      const res = await axios.post(`${url}/api/song/update`, {
        id: track._id,
        albumId,
      });
      if (res.data.success) {
        toast.success("Added to playlist");
        const updated = await axios.get(`${url}/api/song/list`);
        setSongsData(updated.data.songs);
      } else {
        toast.error("Failed to add");
      }
    } catch (err) {
      toast.error("Error adding to playlist");
    }
  };

  return track ? (
    <div className="fixed bottom-0 left-0 w-full h-[80px]m bg-[linear-gradient(#3f37c9,#480ca8)] flex justify-between items-center text-[#ffe0e9] rounded px-4 z-50">
      <div className="hidden lg:flex items-center gap-4">
        <img className="w-12" src={track.image} alt="" />
        <div>
          <p>{track.name}</p>
          <p>{track.artist}</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 m-auto p-3">
        <div className="flex gap-4">
          <img
            onClick={() => previous()}
            className="w-4 cursor-pointer"
            src={assets.prev_icon}
            alt=""
          />
          {playStatus ? (
            <img
              onClick={pause}
              className="w-4 cursor-pointer"
              src={assets.pause_icon}
              alt=""
            />
          ) : (
            <img
              onClick={play}
              className="w-4 cursor-pointer"
              src={assets.play_icon}
              alt=""
            />
          )}
          <img
            onClick={() => next()}
            className="w-4 cursor-pointer"
            src={assets.next_icon}
            alt=""
          />
        </div>
        <div className="flex items-center gap-5">
          <p>
            {time.currentTime.minute}:{time.currentTime.second}
          </p>
          <div
            ref={seekBg}
            onClick={seekSong}
            className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer"
          >
            <hr
              ref={seekBar}
              className="h-1 border-none w-0 bg-[#00b4d8] rounded-full"
            />
          </div>
          <p>
            {time.totalTime.minute}:{time.totalTime.second}
          </p>
        </div>
      </div>
      <div className="hidden lg:flex items-center gap-2 opacity-75">
        <img
          className="w-4 cursor-pointer"
          src={assets.plus_icon}
          alt="Add"
          onClick={() => setShowDropdown(!showDropdown)}
        />

        {showDropdown && (
          <div className="absolute bottom-14 right-10 bg-[#1e1e1e] border border-gray-600 rounded shadow-md z-50">
            <select
              className="bg-transparent text-[#ffe0e9] px-4 py-2 w-48 focus:outline-none cursor-pointer"
              value={selectedAlbum}
              onChange={handleAlbumChange}
            >
              <option className="bg-[#1e1e1e] text-[#ffe0e9]" value="">
                Select Playlist
              </option>
              {albumsData.map((album) => (
                <option
                  className="bg-[#1e1e1e] text-[#ffe0e9] hover:bg-gray-700"
                  key={album._id}
                  value={album._id}
                >
                  {album.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <img className="w-4" src={assets.volume_icon} alt="Volume" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-20 h-1 bg-[#4f000b] rounded cursor-pointer accent-white"
        />
      </div>
    </div>
  ) : null;
};

export default Player;
