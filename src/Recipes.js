import React, { useEffect, useState } from 'react'
import { fetchData, useRecipes } from './helpers'
import RecipesHeader from './RecipesHeader'
import RecipesList from './RecipesList'

const sortProps = {
  "title": "Title",
  "publisher": "Publisher",
  "social_rank": "Rank"
}

export default function Recipes(props) {
  // get the recipes state
  const { error, setError, query, recipes, setRecipes } = useRecipes(props.match.params.query);
  // the current sort property
  const [sortProp, setSortProp] = useState("title");
  // only on first render fetchDate [LS OR API]
  useEffect( () => {
    fetchData({ query, setRecipes, setError });
  }, []);
  // change sort property when button click
  // and change sort direction by adding '-' if the button value == prev sortProp
  const doSort = ({ target: { value }}) => {
    setSortProp((sortProp === value)? "-"+value : value);
  }
  // if not recipes render error message
  if(!recipes.length)
    return (
      <main className="intro d-flex flex-column align-items-center justify-content-around">
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
      </main>
    )
  // render recipes
  return (
    <main>
      <RecipesHeader recipes={recipes} sortProps={sortProps} sortProp={sortProp} doSort={doSort} />
      <RecipesList recipes={recipes} sortProp={sortProp} />
    </main>
  )
}