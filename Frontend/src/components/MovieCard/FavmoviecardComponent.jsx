import React from "react";

// This component is for rendering individual movie cards
export const FavmovieCard = ({ movie, removeFromWatchlist }) => {
  return (
    <div
      className="p-4 rounded-lg shadow-md text-center hover:scale-110 flex flex-col justify-between h-full"
      key={movie.imdbID}  // Use movie object directly
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
      <button
          className="btn btn-primary hover:scale-110"
          onClick={() => {removeFromWatchlist(movie.imdbID)}}
        >
          remove from watchlist
        </button>
    </div>
  );
};
