import React from "react"
import shortid from 'shortid'
import {useFetch, getUrl } from './helpers'
import Loading from "./Loading";

export default function Recipe(props) {

  const rId = props.match.params.id;
  const req = ['get', getUrl({ rId })];
  const { loading, error, data: { recipe } } = useFetch(req, rId);
  // renderIngredients list
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
  // if there not recipe yet render Loading spinner
  if(loading)
    return <Loading />
  // if there is an error render error message
  if(error)
    return <div className="alert alert-danger" role="alert">{error}</div>
  // if there is a recipe then render recipe
  if(recipe)
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
  return null;
}