import { useEffect, useState } from "react";
import "./App.css";
import "./index.css";

function App() {
  // State to hold the search term
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]); //state for å lagre movie data
  const [error, setError] = useState(null); // state for å lage errors
  const [loading, setLoading] = useState(true); // state for å håndtere loading statuser¨

  //send HTTP request til backen APIets endpoint for å hente data(fetch)
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
    <div className="App">
      <h1 className="text-4xl font-bold">Movie Search</h1>

      <form>
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

      {movies.length > 0 ? (
        <div className="movie-list">
          {movies.map((movie) => (
            <div key={movie.imdbID}>
              <h2>{movie.Title}</h2>
              <img src={movie.Poster} alt={movie.Title} />
              <p>{movie.Year}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No movies found</p>
      )}
    </div>
  );
}

export default App;
