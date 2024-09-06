import { useEffect, useState } from "react";
import "./App.css";
import "./index.css";
import { MovieCard } from "./components/MovieCard/MovieCard";

function App() {
  // State to hold the search term
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]); //state for å lagre movie data
  const [error, setError] = useState(null); // state for å lage errors
  const [loading, setLoading] = useState(true); // state for å håndtere loading statuser¨

  //send HTTP request til backend APIets endpoint for å hente data(fetch)
  const fetchMovies = async (movieTitle) => {
    try {
      setLoading(true); // vis loading state når du fetcher
      setError(null); //reset error staten
      const response = await fetch(
        `http://localhost:3000/api/movies/${movieTitle}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setMovies(data.movieList); // er dette riktig?!
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    } finally {
      setLoading(false); // set loading to false når fetchen er gjennomført
    }
  };

  useEffect(() => {
    console.log(searchTerm);
  }, [searchTerm]);

  //håndter form submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") {
      setError("please enter a movie title.");
      return;
    }
    if (searchTerm) {
      fetchMovies(searchTerm);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  //display dataen
  return (
    <div className="App h-full w-full flex flex-col items-center justify-center">
      {/* First inner div - takes up 1/4 of the screen height */}
      <div className="h-1/4 w-full flex-col items-center py-5 bg-blue-200">
        <h1 className="text-4xl text-center font-bold py-5">Movie Search</h1>
        <form className="flex flex-col items-center gap-y-5">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a movie..."
          />
          <button onClick={handleSearch} className="btn btn-active btn-primary">
            Search
          </button>
        </form>
      </div>

      {/* Second inner div - Movie List */}
      <div className="MovieCardsComponent h-3/4 w-full bg-green-200 flex justify-center items-start p-6">
        {movies.length > 0 ? (
          <div className="grid grid-cols-5 gap-6 w-full">
            {movies.map((movie) => (
              <MovieCard movie={movie}></MovieCard>
            ))}
          </div>
        ) : (
          <p>No movies found</p>
        )}
      </div>
    </div>
  );
}

export default App;
