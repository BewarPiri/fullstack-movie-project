import React, { useEffect, useState } from "react";
import "./App.css";
import "./index.css";

function MovielistPage() {
  const [movies, setMovies] = useState([]); // State to hold movie data
  const [error, setError] = useState(null); // State for error handling
  const [loading, setLoading] = useState(true); // State for loading status

  // Function to fetch movie list from the backend API
  const fetchMovies = async () => {
    try {
      setLoading(true); // Set loading to true when fetching data
      const response = await fetch("http://localhost:3000/api/movielist"); // Fetch from the API
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setMovies(data.movieList); // Set the fetched movies to state
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message); // Set error if something goes wrong
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  // useEffect to fetch data when the component mounts
  useEffect(() => {
    fetchMovies();
  }, []);

  // Display loading, error, or movies
  return (
    <div >
      <h1 className="App h-full w-full flex flex-col items-center justify-center" data-theme="dark">Movie List</h1>

      {loading && <p>Loading...</p>} {/* Show loading status */}
      {error && <p>Error: {error}</p>} {/* Show error message if any */}

      {/* Display the movie list */}
      {movies.length > 0 ? (
        <div className="MovieCardsComponent h-3/4 w-full bg-black-200 flex justify-center items-start p-6">
          <ul className="grid grid-cols-5 gap-6 w-full">
            {movies.map((movie) => (
              <li key={movie.id} className="movie-card">
                <h3>{movie.title}</h3>
                <p>{movie.year}</p>
                {/* Add other movie details as needed */}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        !loading && <p>No movies found in the list.</p> // Show message if no movies
      )}
    </div>
  );
}

export default MovielistPage;
