import React, { useEffect, useState } from 'react'
import { fetchData } from './helpers'
import logo from './food2fork-logo.png'
import './app.css'

export default function App() {

  const [error, setError] = useState('');
  const [query, setQuery] = useState('burger');
  const [recipes, setRecipes] = useState([]);

  useEffect( () => {
    fetchData({ query, setRecipes, setError });
  }, []);

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg bg-dark d-flex justify-content-between align-items-center">
          <a className="navbar-brand text-light" href="#!">
            <img className="app-logo" src={logo} alt="Food2Fork" />
          </a>
          <form className="form-inline" onSubmit={ async e => {
            e.preventDefault();
            fetchData({ query, setRecipes, setError });
          }}>
            <input className="form-control form-control-lg mr-sm-2 w-75"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={query}
              onChange={ ({ target: { value } }) => setQuery(value) } />
            <button className="btn btn-outline-warning btn-lg my-2 my-sm-0" type="submit">
              Search
            </button>
          </form>
        </nav>
      </header>
      <div className="container">
        {( !recipes.length
          ? <main className="intro d-flex flex-column align-items-center justify-content-around">
              {error && <div class="alert alert-danger" role="alert">{error}</div>}
              <h2>Food2Fork</h2>
              <span>Food2Fork makes it easy to find great recipes.</span>
              <span>Search by name or ingredients.</span>
              <span>Join to save your favorites for later.</span>
            </main>
          : <main className="recipes list-group">
              {recipes.map( recipe => (
                <li key={recipe.recipe_id} className="list-group-item list-group-item-action d-flex justify-content-start align-items-center">
                  <img className="recipe-thumb" src={recipe.image_url} alt={recipe.title} />
                  <div className="recipe-content">
                    <h3>{recipe.title}</h3>
                    <p> <strong>Publisher: </strong>{recipe.publisher}</p>
                    <p> <strong>Rank: </strong>{Number(recipe.social_rank).toFixed(2)}</p>
                  </div>
                </li>
              ))}
            </main>
        )}
      </div>
    </>
  )
}