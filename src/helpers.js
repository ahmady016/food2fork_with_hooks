import { useState } from 'react'
import axios from 'axios'
import LS from './localStorage'

const API = {
  KEY: 'd3ab033003c2e546e131f5b45402e3e9',
  BASE_URL: 'http://food2fork.com/api',
  PAGE_COUNT: 10
}

export function useRecipes(_query) {
  const [error, setError] = useState('');
  const [query, setQuery] = useState(_query);
  const [recipes, setRecipes] = useState([]);
  const [recipe, setRecipe] = useState({});
  return {
    error,
    setError,
    query,
    setQuery,
    recipes,
    setRecipes,
    recipe,
    setRecipe
  }
}

export async function request({ query = '', recipeId = '' }) {
  const searchURL  = `${API.BASE_URL}/search?key=${API.KEY}&q=`;
  const detailsURL = `${API.BASE_URL}/get?key=${API.KEY}&rId=`;
  const url = (query)
                ? searchURL + query
                : detailsURL + recipeId;
  const { data } = await axios.get(url);
  if (data.error)
    return data.error;
  if( (!data.recipes || !data.recipes.length) && !data.recipe)
    return 'Resource Not found!';
  console.log('TCL: ----------------------------')
	console.log('TCL: request -> data', data)
	console.log('TCL: ----------------------------')
  return data.recipes || data.recipe;
}

export async function fetchData({ setError, query = '', setRecipes = null, recipeId = '', setRecipe = null }) {
  if(!setError)
    throw new Error("must supply setError function");
  let res;
  setError('');
  if(query && setRecipes) {
    res = LS.get(query);
    if(res)
      setRecipes(res);
    else {
      res = await request({ query });
      if(typeof res === 'string')
        setError(res)
      else {
        LS.set(query, JSON.stringify(res));
        setRecipes(res);
      }
    }
  } else if (recipeId && setRecipe) {
    res = LS.get(recipeId);
    if(res)
      setRecipe(res);
    else {
      res = await request({ recipeId });
      if(typeof res === 'string')
        setError(res)
      else {
        LS.set(recipeId, JSON.stringify(res));
        setRecipe(res);
      }
    }
  }
  else
    throw new Error("must supply 2 params: [query, setRecipes] OR [recipeId, setRecipe]");
}

export function orderBy(prop) {
  // if there is no prop and/or not array of objects
  // just return simple ascending string sort
  if (!prop)
    return (a,b) => a-b;
  // sort the objects by prop [ascending - descending]
  let sortOrder = 1;
  if (prop[0] === "-") {
    sortOrder = -1;
    prop = prop.substr(1);
  }
  return (a,b) => {
    (sortOrder === 1)
      // sort ascending if sortOrder = 1
      ? a[prop].localeCompare(b[prop])
      // sort descending if sortOrder = -1
      : b[prop].localeCompare(a[prop]);
  }
}