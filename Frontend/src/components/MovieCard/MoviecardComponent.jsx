import React from "react";

// This component is only for rendering individual movie cards
export const MovieCard = ({ movie, addToWatchList }) => {
  // Correctly destructure props here
  return (
    <div
      className="p-4 rounded-lg shadow-md text-center hover:scale-110 flex flex-col justify-between h-full"
      key={movie.imdbID} // Use movie object directly
      data-theme="valentine"
    >
      <figure>
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="w-full h-auto mb-4 rounded"
        />
      </figure>
      <div className="card-body flex flex-col flex-grow">
        <h2 className="text-lg font-semibold mb-2">{movie.Title}</h2>
      </div>
      <p className="text-gray-600 text-xl font-bold">{movie.Year}</p>
      <div className="card-actions flex justify-end mt-4">
        <button
          className="btn btn-primary hover:scale-110"
          onClick={() => addToWatchList(movie)}
        >
          Add to Watchlist
        </button>
      </div>
    </div>
  );
};
