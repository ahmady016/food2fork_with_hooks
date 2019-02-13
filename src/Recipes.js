import React, { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import { fetchData, useRecipes } from './helpers'

const sortProps = {
  "title": "Title",
  "publisher": "Publisher",
  "social_rank": "Rank"
}

export default function Recipes(props) {

  const { error, setError, query, recipes, setRecipes } = useRecipes(props.match.params.query);

  const [sortProp, setSortProp] = useState("title");

  useEffect( () => {
    fetchData({ query, setRecipes, setError });
  }, []);

  const doSort = ({ target: { value }}) => {
    setSortProp((sortProp === value)? "-"+value : value);
  }

  if(!recipes.length)
    return (
      <main className="intro d-flex flex-column align-items-center justify-content-around">
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        <h2>Food2Fork</h2>
        <span>Food2Fork makes it easy to find great recipes.</span>
        <span>Search by name or ingredients.</span>
        <span>Join to save your favorites for later.</span>
      </main>
    )
  else
    return (
      <main className="recipes list-group">
        <div className="alert alert-primary mt-3 d-flex justify-content-between align-items-center" role="alert">
          <span>
            <strong>Found: </strong>
            <strong>{recipes.length} </strong>
            recipe(s)
            from <strong>{[...recipes].unique('publisher').length} </strong>
            publisher(s) ...
          </span>
          <form className="form-inline w-50">
            <label className="my-1 mr-3" htmlFor="sort-by">Sort By:</label>
            <i className={`fas fa-sort-alpha-${sortProp.includes('-')? 'up' : 'down'}`}></i>
            {Object.keys(sortProps).map( key => (
              <button type="button"
                  className={`btn btn-primary btn-sm mr-2 ${sortProp.includes(key)? 'active' : ''}`}
                  id={key}
                  value={key}
                  onClick={doSort} >
                {sortProps[key]}
              </button>
            ))}
          </form>
        </div>
        { [...recipes].orderBy(sortProp).map(recipe => (
          <li key={recipe.recipe_id} className="list-group-item list-group-item-action d-flex justify-content-start align-items-center">
            <img className="recipe-thumb" src={recipe.image_url} alt={recipe.title} />
            <div className="recipe-content">
              <h3><Link to={`/recipe/${recipe.recipe_id}`}>{recipe.title}</Link></h3>
              <p> <strong>Publisher: </strong>{recipe.publisher}</p>
              <p> <strong>Social Rank: </strong>{Number(recipe.social_rank).toFixed(2)}</p>
            </div>
          </li>
        ))}
      </main>
    )
}