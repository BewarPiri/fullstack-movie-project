import { useEffect, useState } from "react";
import "./App.css";
import "./index.css";
import { MovieCard } from "./components/MovieCard/MovieCard";
import { Search } from "./components/SearchComponent/search";

function Searchpage() {
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

// useEffect-funksjonen passer på søketeksten ("searchTerm").
// Hver gang søketeksten endrer seg, blir den nye teksten skrevet ut i konsollen (for debugging eller testing).
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

// handleInputChange-funksjonen blir aktivert når brukeren skriver i søkefeltet.
// Den sørger for at søketeksten oppdateres etter hvert som brukeren skriver.
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  //display dataen
  return (
    <div className="App h-full w-full flex flex-col items-center justify-center" data-theme="dark">
      {/* First inner div - takes up 1/4 of the screen height(search component) */}
      <Search
        searchTerm={searchTerm}
        handleInputChange={handleInputChange}
        handleSearch={handleSearch}
      />

      {/* Second inner div - Movie List */}
      <div className="MovieCardsComponent h-3/4 w-full bg-black-200 flex justify-center items-start p-6">
        {movies.length > 0 ? (
          <div className="grid grid-cols-5 gap-6 w-full">
            {movies.map((movie) => (
              <MovieCard movie={movie}></MovieCard>
            ))}
          </div>
        ) : (
          <p>Movies will appear here!</p>
        )}
      </div>
    </div>
  );
}

export default Searchpage;
