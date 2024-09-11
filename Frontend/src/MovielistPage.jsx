import React, { useEffect, useState } from "react";
import "./App.css";
import "./index.css";
import { FavmovieCard } from "./components/MovieCard/FavmovieCard";

function MovielistPage() {
  const [movies, setMovies] = useState([]); // State to hold movie data
  const [error, setError] = useState(null); // State for error handling
  const [loading, setLoading] = useState(true); // State for loading status

  // Function to fetch the movie list from the backend API
  const fetchMovies = async () => {
    try {
      setLoading(true); // Set loading to true when fetching data
      setError(null); // Reset error state
      const response = await fetch("http://localhost:3000/api/movielist"); // endpoint for movielist
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setMovies(data.movieList); // Set fetched movies inn i en "state"
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    } finally {
      setLoading(false); 
    }
  };

  // useEffect to fetch data when the component mounts
  useEffect(() => {
    fetchMovies();
  }, []);

  // vis enten loading, error, eller movies
  return (
    <div>
      <h1 className="text-6xl font-extrabold text-center py-6" data-theme="valentine">Favorite Movie List</h1>

      {loading && <p>Loading...</p>} {/* vis loading status */}
      {error && <p>Error: {error}</p>} {/* Show error message if any */}

      {/* Display the movie list */}
      <div className="MovieCardsComponent h-3/4 w-full bg-black-200 flex justify-center items-start p-6">
        {movies.length > 0 ? (
          <div className="grid grid-cols-5 gap-6 w-full">
            {movies.map((movie) => (
              <FavmovieCard key={movie.id} movie={movie} /> // Added key prop
            ))}
          </div>
        ) : (
          !loading && <p>Favorite movies will appear here!</p> // Show message if no movies
        )}
      </div>
    </div>
  );
}

export default MovielistPage;
