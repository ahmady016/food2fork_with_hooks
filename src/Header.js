import React, { useEffect, useState } from "react"
import { NavLink, Link } from 'react-router-dom'
import logo from './food2fork-logo.png'

export default function Header({ location, history, initQuery }) {
  // get the query and setQuery state and
  // give the quey the initial value from the location.pathname
  const [ query, setQuery ] = useState(location.pathname.split('/')[2] || initQuery);
  // setQuery when location pathname changes
  useEffect(() => {
    setQuery(location.pathname.split('/')[2] || '');
  }, [location.pathname]);
  // doSearch by go to recipes routes with new query
  const doSearch = (e) => {
    e.preventDefault();
    history.push(`/recipes/${query}`);
  }
  // render
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-dark d-flex justify-content-between align-items-center">
        <Link className="navbar-brand text-light" to="/">
          <img className="app-logo" src={logo} alt="Food2Fork" />
        </Link>
        <form className="form-inline" onSubmit={doSearch}>
          <input className="form-control form-control-lg mr-sm-2 w-75"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={query}
            onChange={ e => setQuery(e.target.value) } />
          <button className="btn btn-outline-warning btn-lg my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>
        <ul className="nav nav-pills">
          <li className="nav-item">
            <NavLink className={`nav-link  ${(window.location.href.includes('/about'))? 'active' : ''}`} to="/about">About</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}