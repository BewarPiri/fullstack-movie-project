import React from "react";

// Denne komponenten er kun for selve rammene rundt filmene (cards)
export const MovieCard = (props) => {
  return (
    <div
      className="p-4 rounded-lg shadow-md text-center hover:scale-110 flex flex-col justify-between h-full"
      key={props.movie.imdbID}
      data-theme="valentine"
    >
      <figure>
        <img
          src={props.movie.Poster}
          alt={props.movie.Title}
          className="w-full h-auto mb-4 rounded"
        />
      </figure>
      <div className="card-body flex flex-col flex-grow">
        <h2 className="text-lg font-semibold mb-2">{props.movie.Title}</h2>
      </div>
      <p className="text-gray-600 text-xl font-bold">{props.movie.Year}</p>
      <p className="text-gray-600 text-xl font-bold">{props.movie.imdbRating}</p>
      <div className="card-actions flex justify-end mt-4">
        {/* Add to Watchlist button calls addToWatchList with movie.id */}
        <button
          className="btn btn-primary hover:scale-110"
          onClick={() => addToWatchList(movie)} // Pass movie to addToWatchList
        >
          Add to Watchlist
        </button>
      </div>
    </div>
  );
};
