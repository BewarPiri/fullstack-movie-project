import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";
import { setupDatabaseAndTable } from "./dbSetup.js";


dotenv.config(); // Load environment variables from .env file
const app = express();
const port = 3000; // Port for backend
app.use(cors()); // tilgjengeliggjør cors for alle routes

const API_KEY = process.env.API_KEY; // API key from .env file
const BASE_URL =
  process.env.BASE_URL || `http://www.omdbapi.com/?apikey=${API_KEY}&`;

  // Run the setup function for database and table
await setupDatabaseAndTable();

// Endpoint for å fetche movies
app.get("/api/movies/:movie", async (req, res) => {
  const userInput = req.params.movie;
  console.log("du har truffet APIet, query: " + userInput);
  if (!userInput) {
    return res
      .status(400)
      .json({ error: " request param 'movie' is required" });
  }

  let movieList = [];
  try {
    const response = await fetch(`${BASE_URL}s=${userInput}`);
    const data = await response.json();
    movieList = data.Search;
    movieList.forEach((object) => {
      console.log("movie title: " + object.Title);
    });

    return res.status(200).json({ status: "success", movieList: movieList });
    //console.log("dette er filmlista " + JSON.stringify(movieList));
  } catch (error) {
    console.error("Failed to fetch data from OMDB API", error);
    res.status(400).json({
      status: "error ",
      error: "Failed to fetch data from OMDB API",
    });
  }

  //her har vi movieList klar med alle filmene vi fant fra OMDB APIet.
  console.log("alle filmene");
});

// Start serveren
app.listen(port, () => {
  console.log(`Backend server listening on port ${port}`);
});
