import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Searchpage from './Searchpage'; // Ensure this file exists
import MovielistPage from './MovielistPage'; // Check this file for correct naming
import './index.css'; // Ensure this file exists
import RecommendedMoviesPage from './RecommendedMoviesPage'; // Ensure this file exists

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Searchpage />} />  {/* Search Page Route */}
        <Route path="/MovielistPage" element={<MovielistPage />} /> {/* Movielist Page Route */}
        <Route path="/RecommendedMoviesPage" element={<RecommendedMoviesPage />} /> {/* Recommendation Page Route */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
