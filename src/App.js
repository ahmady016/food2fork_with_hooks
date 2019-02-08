import React from 'react';
import logo from './food2fork-logo.png'
import './app.css';

export default function App() {
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg bg-dark d-flex justify-content-between align-items-center">
          <a className="navbar-brand text-light" href="#">
            <img className="app-logo" src={logo} alt="Food2Fork" />
          </a>
          <form className="form-inline">
            <input className="form-control mr-sm-2 w-75" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-warning my-2 my-sm-0" type="submit">Search</button>
          </form>
        </nav>
      </header>
      <div className="container">
        food result ...
      </div>
    </>
  )
}