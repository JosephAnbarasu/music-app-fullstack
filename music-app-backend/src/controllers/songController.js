import { v2 as cloudinary } from "cloudinary";
import songModel from "../models/songModel.js";

const addSong = async (req, res) => {
  try {
    const name = req.body.name;
    const artist = req.body.artist;
    const audioFile = req.files.audio[0];
    const imageFile = req.files.image[0];
    const audioUpload = await cloudinary.uploader.upload(audioFile.path, {
      resource_type: "video",
    });
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(
      audioUpload.duration % 60
    )}`;
    const albumId = req.body.albumId;

    const songData = {
      name,
      artist,
      image: imageUpload.secure_url,
      file: audioUpload.secure_url,
      duration,
      albumId: albumId || null,
    };

    const song = songModel(songData);
    await song.save();

    res.json({ success: true, message: "Song Added" });
  } catch (error) {
    res.json({ success: false });
  }
};

const listSong = async (req, res) => {
  try {
    const allSongs = await songModel.find({});
    res.json({ success: true, songs: allSongs });
  } catch (error) {
    res.json({ success: false });
  }
};

const removeSong = async (req, res) => {
  try {
    await songModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Song deleted successfully" });
  } catch (error) {
    res.json({ success: false });
  }
};

const updateSong = async (req, res) => {
  try {
    const { id, albumId } = req.body;
    await songModel.findByIdAndUpdate(id, { albumId });
    res.json({ success: true, message: "Song updated" });
  } catch (error) {
    res.json({ success: false, message: "Error updating song" });
  }
};

export { addSong, listSong, removeSong, updateSong };
