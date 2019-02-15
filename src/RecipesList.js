import React from 'react'
import { Link } from 'react-router-dom'

export default function RecipesList({ recipes, sortProp }) {
  return (
    <div className="recipes-list list-group">
      { [...recipes].orderBy(sortProp).map(recipe => (
        <li key={recipe.recipe_id} className="list-group-item mb-2 list-group-item-action d-flex justify-content-start align-items-center">
          <img className="recipe-thumb" src={recipe.image_url} alt={recipe.title} />
          <div className="recipe-content">
            <h3><Link to={`/recipe/${recipe.recipe_id}`}>{recipe.title}</Link></h3>
            <p> <strong>Publisher: </strong>{recipe.publisher}</p>
            <p> <strong>Social Rank: </strong>{Number(recipe.social_rank).toFixed(2)}</p>
          </div>
        </li>
      ))}
    </div>
  )
}
