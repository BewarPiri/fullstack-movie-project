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

  return (
    <div className="App">
      <h1 className="text-4xl font-bold text-red-500">
        Hello Tailwindscss with react vite
      </h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search for a movie..."
          className="search-bar"
        />
        <button className="btn btn-primary">Primary</button>
      </form>
    </div>
  );
}

export default App;
