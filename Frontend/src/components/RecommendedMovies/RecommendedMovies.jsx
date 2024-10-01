import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const RecommendedMovies = () => {
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
      setMovies(data);
      console.log("Movies set:", data);
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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Recommended Movies</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {movies.length === 0 ? (
        <p className="text-center">No recommendations available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {movies.map((movie) => (
            <div
              className="p-4 rounded-lg shadow-md text-center hover:scale-110 flex flex-col justify-between h-full"
              key={movie.imdbID}
              data-theme="valentine"
            >
              <figure>
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-auto mb-4 rounded"
                />
              </figure>
              <div className="card-body flex flex-col flex-grow">
                <h2 className="text-lg font-semibold mb-2">{movie.title}</h2>
              </div>
              <p className="text-gray-600 text-xl font-bold">{movie.year}</p>
              <div className="card-actions flex justify-end mt-4">
                <button className="btn btn-primary hover:scale-110">
                  Add to Watchlist
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <nav className="mt-8">
        <ul className="flex justify-center space-x-4">
          <li><Link to="/" className="btn btn-secondary">Back to Search page</Link></li>
          <li><Link to="/MovielistPage" className="btn btn-secondary">Favorite movielist page</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default RecommendedMovies;