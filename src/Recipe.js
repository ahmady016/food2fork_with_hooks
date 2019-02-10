import React, { useEffect } from "react"
import shortid from 'shortid'
import { fetchData, useRecipes } from './helpers'

export default function Recipe(props) {

  const { error, setError, recipe, setRecipe } = useRecipes();

  useEffect( () => {
    fetchData({ setError, recipeId: props.match.params.id, setRecipe });
  }, []);

  const renderIngredients = (ingredients) => {
    if(!ingredients)
      return null;
    return ingredients.map(ingredient => (
      <li key={shortid.generate()} className="list-group-item">
        <i className="fas fa-utensils"></i>
        {ingredient}
      </li>
    ))
  }

  if(error)
    return <div className="alert alert-danger" role="alert">{error}</div>
  if(!recipe)
    return (
      <main className="text-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </main>
    );
  return (
    <main>
      <div className="card">
        <div className="card-header">
          <img className="card-img-top" src={recipe.image_url} alt={recipe.title} />
        </div>
        <div className="card-body">
          <h4 className="card-title">{recipe.title}</h4>
          <p className="card-text">
            <strong>Publisher: </strong>{recipe.publisher}
          </p>
          <p><strong>Ingredients:</strong></p>
          <ul className="list-group">
            {renderIngredients(recipe.ingredients)}
          </ul>
        </div>
        <div className="card-footer d-flex justify-content-around">
          <a href={recipe.publisher_url}>Publisher Url</a>
          <a href={recipe.source_url}>Source URL</a>
          <span><strong>Rank: </strong>{Number(recipe.social_rank).toFixed(2)}</span>
        </div>
      </div>
    </main>
  )
}