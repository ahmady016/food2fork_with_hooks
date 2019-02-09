import React from "react";
import { fetchData, useRecipes } from './helpers'
import logo from './food2fork-logo.png'

export default function Header() {
  const { setError, query, setQuery, setRecipes } = useRecipes();
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-dark d-flex justify-content-between align-items-center">
        <a className="navbar-brand text-light" href="#!">
          <img className="app-logo" src={logo} alt="Food2Fork" />
        </a>
        <form className="form-inline" onSubmit={ e => {
          e.preventDefault();
          fetchData({ query, setRecipes, setError });
        }}>
          <input className="form-control form-control-lg mr-sm-2 w-75"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={query}
                onChange={({ target: { value } }) => setQuery(value)} />
          <button className="btn btn-outline-warning btn-lg my-2 my-sm-0" type="submit">
            Search
            </button>
        </form>
      </nav>
    </header>
  );
}