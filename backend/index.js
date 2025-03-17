// Packages immport
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import path from "path";

//  File :
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import genreRoutes from "./routes/genreRoutes.js";
import moviesRoutes from "./routes/moviesRoutes.js";

import uplaodRoutes from "./routes/uploadRoutes.js";
// Configuration:
dotenv.config();
connectDB();

//  storing in the app all the express:
const app = express();

//  Middleware:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//  PORT :
const PORT = process.env.PORT || 3000;

//  Routes : // - version 1
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/genre", genreRoutes);
app.use("/api/v1/movies", moviesRoutes);
app.use("/api/v1/upload", uplaodRoutes);

//

// Serve Static Files for uploads:
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/v1/genre", genreRoutes);
//  Listeing To the POrt :
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
