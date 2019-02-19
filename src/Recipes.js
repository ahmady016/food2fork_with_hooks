import React, { useState } from 'react'
import { useFetch, getUrl } from './helpers'
import Loading from './Loading.js'
import RecipesHeader from './RecipesHeader'
import RecipesList from './RecipesList'

const sortProps = {
  "title": "Title",
  "publisher": "Publisher",
  "social_rank": "Rank"
}

export default function Recipes(props) {
  // the current sort property
  const [sortProp, setSortProp] = useState("title");

  const q = props.match.params.query;
  const req = ['get', getUrl({ q })];
  const { loading, error, data: { recipes } } = useFetch(req, q);
  // change sort property when button click
  // and change sort direction by adding '-' if the button value == prev sortProp
  const doSort = ({ target: { value }}) => {
    setSortProp((sortProp === value)? "-"+value : value);
  }
  // if not recipes render error message
  if(loading || error)
    return (
      <main className="intro d-flex flex-column align-items-center justify-content-around">
        { loading && <Loading /> }
        { error && <div className="alert alert-danger" role="alert">{error}</div> }
      </main>
    )
  else if(recipes && recipes.length)
    // render recipes
    return (
      <main>
        <RecipesHeader recipes={recipes} sortProps={sortProps} sortProp={sortProp} doSort={doSort} />
        <RecipesList recipes={recipes} sortProp={sortProp} />
      </main>
    )
  return null;
}