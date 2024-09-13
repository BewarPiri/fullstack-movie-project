import React from "react";
import { Nav } from "../navComponent/NavComponent";

// Use props instead of destructuring
export const Search = (props) => {
  return (
    <div
      className="h-1/4 w-full flex-col items-center py-5"
      data-theme="valentine"
    >
      <h1 className="text-6xl font-extrabold text-center py-6">Movie Search</h1>

      <form
        className="flex flex-col items-center gap-y-5"
        onSubmit={props.handleSearch}
      >
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Search"
            value={props.searchTerm}
            onChange={props.handleInputChange}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
        <button className="btn btn-active btn-primary hover:scale-110">Search</button>
                 {/* Render the Nav component here */}
      <Nav>here is the nav button</Nav>
      </form>
    </div>
  );
};
