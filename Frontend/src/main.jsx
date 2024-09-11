import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Searchpage from './Searchpage';
import MovielistPage from './Movielistpage'; 
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/SearchPage" element={<Searchpage />} />  {/* Search Page Route */}
        <Route path="/MovielistPage" element={<MovielistPage />} /> {/* Movielist Page Route */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
