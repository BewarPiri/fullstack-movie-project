import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Searchpage from './Searchpage';
import MovielistPage from './Movielistpage'; 
import './index.css';
import RecommendedMoviesPage from './RecommendedMoviesPage';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Searchpage />} />  {/* Search Page Route */}
        <Route path="/MovielistPage" element={<MovielistPage />} /> {/* Movielist Page Route */}
        <Route path="/RecommendedMoviesPage" element={<RecommendedMoviesPage/>} /> {/* Recommendation Page Route */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
