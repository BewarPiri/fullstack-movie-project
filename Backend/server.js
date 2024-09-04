import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const app = express();
const API_KEY = process.env.API_KEY; // API key from .env file
const BASE_URL =
  process.env.BASE_URL || `http://www.omdbapi.com/?apikey=${API_KEY}&`;

const port = 3000; // Port for the backend

// Endpoint to fetch movies
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
    //console.log("dette er filmlista " + JSON.stringify(movieList));
  } catch (error) {
    console.error("Failed to fetch data from OMDB API", error);
    res.status(500).json(
      {
        status: 'error ', 
        error: "Failed to fetch data from OMDB API" 
      });
  }

  //her har vi movieList klar med alle filmene vi fant fra OMDB APIet.
  console.log(movieList.length);
  console.log("alle filmene");

  // for (let i = 0; i < movieList.length; i++) {
  //   console.log("movie number " + i + ": " + movieList[i].Title);
  // }

  // marcus lærer meg for-each loop

  // movieList.forEach(object => {
  //   console.log('movie title: ' + object.Title)
  // });



  return res.status(200).json({ status: 'success', movieList: movieList });
});

// Start the server
app.listen(port, () => {
  console.log(`Backend server listening on port ${port}`);
});
