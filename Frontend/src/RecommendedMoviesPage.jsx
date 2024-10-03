import React, { useEffect, useState } from "react";
import { Nav } from "./components/navComponent/NavComponent";
import { MovieCard } from "./components/MovieCard/MoviecardComponent";


const RecommendedMoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('http://localhost:3000/api/recommendations');
      
      if (!response.ok) {
        throw new Error('Failed to fetch recommendations');
      }

      const data = await response.json();
      console.log("fetched data :", data)

      if(data.status === "success" && Array.isArray(data.recommendedList)) {
        setMovies(data.recommendedList);
      } else {
        console.error("recommendedList is not an array:", data.recommendedList);
        setError("No recommendations available.")
      }
      // setMovies(data.recommendedList);
      // console.log("Movies set:", data.recommendedList);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      setError("Failed to load recommendations. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);
  

  return (
    <div className="p-4" >
          <div className="pb-5" data-theme="valentine">
        <Nav />
        <h1
          className="text-6xl font-extrabold text-center py-6"
          data-theme="valentine"
        >
          Recommendations
        </h1>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <div className="MovieCardsComponent h-3/4 w-full bg-black-200 flex justify-center items-start p-6">
        {movies.length > 0 ? (
          <div className="grid grid-cols-5 gap-6 w-full">
            {movies.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
              />
            ))}
          </div>
        ) : (
          !loading && <p>recommended movies will appear here!</p>
        )}
      </div>

    </div>
  );
};

export default RecommendedMoviesPage;