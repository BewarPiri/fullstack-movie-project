import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";
import { setupDatabaseAndTable } from "./dbSetup.js";
import { addMovie, getMovieList, deleteMovieByID } from "./dbservice.js";
import {getRecommendations, getAiRecommendations} from "./AIservices.js";

dotenv.config(); // Load environment variables from .env file
const app = express();
const port = 3000;
app.use(cors({
  origin: '*', // Allow all origins, or specify the frontend URL
}));
app.use(express.json()); // ta imot request body som json.

const API_KEY = process.env.API_KEY; // API key from .env file
const BASE_URL =
  process.env.BASE_URL || `http://www.omdbapi.com/?apikey=${API_KEY}&`;

// Run the setup function for database and table
 setupDatabaseAndTable();

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

    return res.status(200).json({ status: "success", movieList: movieList });
    //console.log("dette er filmlista " + JSON.stringify(movieList));
  } catch (error) {
    console.error("Failed to fetch data from OMDB API", error);
    res.status(500).json({
      status: "error ",
      error: "Failed to fetch data from OMDB API",
    });
  }

  //her har vi movieList klar med alle filmene vi fant fra OMDB APIet.
  console.log("alle filmene");
});

// Endpoint for å fetche "movielist"
app.get("/api/movielist", async (req, res) => {
  // hent movielist fra databasen og returner den
  const movieList = await getMovieList();
  return res.status(200).json({
    status: "success",
    message: "her er movielist",
    movieList: movieList,
  });
});

// Endpoint for å legge til filmer i "favouritemovielist"
app.post("/api/movielist", async (req, res) => {
  //få tak i movie-object fra request body.
  const movie = req.body.movie;

  const result = await addMovie(movie);
  if (!result) {
    res.status(500).json({
      status: "error ",
      error: "Failed to save movie to movielist",
    });
  }

  return res.status(200).json({
    status: "success",
    message: "movie successfully added to watchlist",
  });
});

//få tak i IDen til movieobjektet, og slett den fra databasen.
app.delete("/ap/movielist/", async (req, res) => {
  const imdbID = req.body.imdbID;

  const result = await deleteMovieByID(imdbID);
  if (!result) {
    res.status(500).json({
      status: "error",
      error: "failed to delete movie from the watchlist",
    });
  }

  return res.status(200).json({
    status: "success",
    message: "movie successfully removed from watchlist",
  });
});

//endpoint for å få tak i hele Movieobjectet og generere et AI svar
app.get('/api/recommendations', async (req, res) => {
  const recommendationObject = await getRecommendations();
  console.log("Recommendations to be sent to frontend: ", JSON.stringify(recommendationObject));
  return res.status(200).json({
    status: "success",
    message: recommendationObject.message,
    recommendedMovies: recommendationObject.recommendedMovies
  });
});


app.get('/AiTest', async (req, res) => {
  const recommendedTitles = await getAiRecommendations();
  console.log(recommendedTitles);
  return res.status(200).json({
    status: "success",
    message: "her er recommendations fra AI",
    recommendedTitles: recommendedTitles,
  });
});


// Start serveren
app.listen(port, () => {
  console.log(`Backend server listening on port ${port}`);
});
