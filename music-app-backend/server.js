import express from "express";
import cors from "cors";
import "dotenv/config";
import songRouter from "./src/routes/songRoute.js";
import connectDB from "./src/config/mongodb.js";
import connectCloudinary from "./src/config/cloudinary.js";
import albumRouter from "./src/routes/albumRoute.js";

//app config

const app = express();

connectDB();
connectCloudinary();
// middlewares

app.use(express.json());
app.use(cors());

// initializing routes
app.use("/api/song", songRouter);
app.use("/api/album", albumRouter);

app.get("/", (req, res) => res.send("API Working"));

// app.listen(port, () => console.log(`Server started on port ${port}`));

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 4000;
  server.listen(PORT, () => console.log("Server is running on PORT :" + PORT));
}

//export srever for vercel
export default server;
