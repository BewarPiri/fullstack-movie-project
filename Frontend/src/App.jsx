import { useState } from "react";
import "./App.css";
import "./index.css";

function App() {
  // State to hold the search term
  const [searchTerm, setSearchTerm] = useState("");

  // Function to handle input changes
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Function to handle form submission (e.g., search button click)
  const handleSearch = (e) => {
    e.preventDefault(); // Prevents the page from refreshing
    console.log("Searching for:", searchTerm);
    // You can add the code to perform the search here
  };

  //send HTTP request til backen APIets endpoint for å hente data(fetch)

  //display dataen

  return (
    <div className="App">
      {
        <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content flex-col lg:flex-row">
            <img
              src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
              className="max-w-sm rounded-lg shadow-2xl"
            />
            <div>
              <h1 className="text-5xl font-bold">Search for movies!</h1>
              <p className="py-6">
                Search for a movie title, and add it to your watchlist for
                later!
              </p>
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleInputChange}
                  placeholder="Search for a movie..."
                  className="search-bar "
                />
                <button className="btn btn-primary">Search</button>
              </form>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default App;
