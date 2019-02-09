import React, { useEffect } from "react";
import { fetchData, useRecipes } from './helpers'

export default function Recipes() {

  const { error, setError, query, recipes, setRecipes } = useRecipes();

  useEffect( () => {
    fetchData({ query, setRecipes, setError });
  }, []);

  if(!recipes.length)
    return (
      <main className="intro d-flex flex-column align-items-center justify-content-around">
        {error && <div class="alert alert-danger" role="alert">{error}</div>}
        <h2>Food2Fork</h2>
        <span>Food2Fork makes it easy to find great recipes.</span>
        <span>Search by name or ingredients.</span>
        <span>Join to save your favorites for later.</span>
      </main>
    )
  else
    return (
      <main className="recipes list-group">
        {recipes.map(recipe => (
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
    )
}