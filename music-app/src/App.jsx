import React, { useContext } from "react";
import Sidebar from "./components/Sidebar.jsx";
import { assets } from "../src/assets/assets.js";
import Player from "./components/Player.jsx";
import Display from "./components/Display.jsx";
import { PlayerContext } from "./context/PlayerContext.jsx";

export const url = "http://localhost:4000";

const App = () => {
  const { audioRef, track, songsData } = useContext(PlayerContext);
  return (
    <div className="h-screen bg-[#480ca8]">
      {songsData.length !== 0 ? (
        <>
          <div className="h-[90%] flex">
            <Sidebar />
            <Display />
          </div>
          <Player />
        </>
      ) : null}

      <audio
        ref={audioRef}
        src={track ? track.file : null}
        preload="auto"
      ></audio>
    </div>
  );
};

export default App;
