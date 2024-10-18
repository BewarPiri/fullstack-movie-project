import React, { useEffect, useState } from "react";
import { Nav } from "./components/navComponent/NavComponent";
import { MovieCard } from "./components/MovieCard/MoviecardComponent";
import ChatBubble from "./components/ChatBubble/ChatBubble";

const RecommendedMoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [aiMessage, setAiMessage] = useState("");

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("http://localhost:3000/api/recommendations");

      if (!response.ok) {
        throw new Error("Failed to fetch recommendations");
      }

      const recommendationObject = await response.json();
      console.log("fetched data :", JSON.stringify(recommendationObject));

      if (
        recommendationObject.status === "success" &&
        Array.isArray(recommendationObject.recommendedMovies)
      ) {
        setMovies(recommendationObject.recommendedMovies);
        setAiMessage(recommendationObject.message);
      } else {
        console.error(
          "recommendedList is not an array:",
          recommendationObject.recommendedMovies
        );
        setError("No recommendations available.");
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

  const addToWatchList = async (movie) => {
    try {
      const response = await fetch(`http://localhost:3000/api/movielist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ movie }), // Sending movie in the request body
      });

      if (!response.ok) {
        throw new Error("Failed to add movie to watchlist");
      }

      const data = await response.json();
    } catch (error) {
      console.error("Error adding to watchlist:", error);
      alert("An error occurred while adding the movie to your watchlist.");
    }
  };

  return (
    <div className="p-4">
      <div className="pb-5" data-theme="valentine">
        <Nav />
        <h1
          className="text-6xl font-extrabold text-center py-6"
          data-theme="valentine"
        >
          Recommendations from AI
        </h1>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {aiMessage && (
        <div className="w-full flex items-center justify-center">
        <div className="w-1/3 pt-3" >
        <ChatBubble message={aiMessage}>
        </ChatBubble>
        </div>
        </div>
      )}
      <div className="MovieCardsComponent h-3/4 w-full bg-black-200 flex justify-center items-start p-6">
        {movies.length > 0 ? (
          <div className="grid grid-cols-5 gap-6 w-full">
            {movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} addToWatchList={addToWatchList}/>
            ))}
          </div>
        ) : (
          !loading && (
            <p>
              recommended movies based on your favorite movielist will appear
              here!
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default RecommendedMoviesPage;
