import React from 'react'

export const MovieCard = (props) => {
  return (
    <div
    key={props.movie.imdbID}
    className="bg-white p-4 rounded-lg shadow-md text-center hover:scale-110"
  >
    <h2 className="text-lg font-semibold mb-2">{props.movie.Title}</h2>
    <img
      src={props.movie.Poster}
      alt={props.movie.Title}
      className="w-full h-auto mb-2 rounded"
    />
    <p className="text-gray-600">{props.movie.Year}</p>
  </div>
  )
}
