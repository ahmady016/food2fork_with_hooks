import React, { useEffect, useState } from 'react'
import axios from 'axios'
import logo from './food2fork-logo.png'
import './app.css'

const API = {
  KEY: 'd3ab033003c2e546e131f5b45402e3e9',
  BASE_URL: 'http://food2fork.com/api',
  PAGE_COUNT: 10
}

async function getFoods(query) {
  const { data } = await axios.get(`${API.BASE_URL}/search?key=${API.KEY}&q=${query}`);
  return data.recipes;
}

export default function App() {

  const [query, setQuery] = useState('burger');
  const [recipes, setRecipes] = useState([]);

  useEffect( () => {
    setRecipes(getFoods(query));
  }, []);

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg bg-dark d-flex justify-content-between align-items-center">
          <a className="navbar-brand text-light" href="#!">
            <img className="app-logo" src={logo} alt="Food2Fork" />
          </a>
          <form className="form-inline" onSubmit={ e => {
            e.preventDefault();
            setRecipes(getFoods(query));
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
              <img className="app-logo" src={logo} alt="Food2Fork" />
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