import React, { useEffect, useState } from "react";
import "./App.css";
import "./index.css";
import { FavmovieCard } from "./components/MovieCard/FavmoviecardComponent";
import { Nav } from "./components/navComponent/NavComponent";

function MovielistPage() {
  const [movies, setMovies] = useState([]); // state for å lagre movie data
  const [error, setError] = useState(null); // State for å lage errors
  const [loading, setLoading] = useState(true); // State for å håndtere loading

  // Function to fetch the movie list from the backend API
  const fetchMovies = async () => {
    try {
      setLoading(true); // Set loading to true
      setError(null); // Reset errors
      const response = await fetch("http://localhost:3000/api/movielist"); // Fetch data
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json(); // Parse the JSON response
      console.log("Fetched data:", data); // Log the fetched data

      // parse movielist fra en string til et array
      const movieList =
        typeof data.movieList === "string"
          ? JSON.parse(data.movieList)
          : data.movieList;

      setMovies(movieList); // Set the movies state with the parsed array
      console.log("movie set: ", movieList); // Log the movies state
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  // useEffect to fetch data when the component mounts
  useEffect(() => {
    fetchMovies();
  }, []);

  const removeFromWatchlist = async (imdbID) => {
    try {
      const response = await fetch(`http://localhost:3000/ap/movielist/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imdbID }), // Sending movie in the request body
      });

      if (!response.ok) {
        throw new Error("Failed to remove movie from movielist");
      }

      //oppdater staten direkte ved å filtrere ut de slettede filmene(da slipper vi å gjøre en ny fetch request)
      setMovies((previousMovies) =>
        previousMovies.filter((movie) => movie.imdbid !== imdbID)
      );
    } catch (error) {
      console.error("Error adding to watchlist:", error);
      alert("An error occurred while trying to delete a movie from your list");
    }
  };

  // Check if movies are being correctly set
  console.log("Movies state:", movies);

  // vis enten loading, error, eller movies
  return (
    <div className="p-4">
      <div className="pb-5" data-theme="valentine">
        <Nav />
        <h1
          className="text-6xl font-extrabold text-center py-6"
          data-theme="valentine"
        >
          Favorite Movie List
        </h1>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>} 

      <div className="MovieCardsComponent h-3/4 w-full bg-black-200 flex justify-center items-start p-6">
        {movies.length > 0 ? (
          <div className="grid grid-cols-5 gap-6 w-full">
            {movies.map((movie) => (
              <FavmovieCard
                key={movie.imdbid}
                movie={{
                  title: movie.title,
                  year: movie.year,
                  imdbID: movie.imdbid,
                  type: movie.type,
                  poster: movie.poster,
                }}
                removeFromWatchlist={removeFromWatchlist}
              />
            ))}
          </div>
        ) : (
          !loading && <p>Favorite movies will appear here!</p>
        )}
      </div>
    </div>
  );
}

export default MovielistPage;
