import React from "react";
import { Link } from "react-router-dom";

export const Nav = () => {
  return (
    <div
      className="navbar bg-base-100 top-0 left-0 text-6xl font-extrabold text-center"
      data-theme="valentine"
    >
      {/* Align items to the left with justify-start */}
      <div>
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              {/* Use Link component for navigation */}
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/MovielistPage">Movielist</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Ensure items are aligned left on larger screens */}
      <div className="navbar-start hidden lg:flex justify-start">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/MovielistPage">Movielist</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
