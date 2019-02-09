import axios from 'axios'
import LS from './localStorage'

const API = {
  KEY: 'd3ab033003c2e546e131f5b45402e3e9',
  BASE_URL: 'http://food2fork.com/api',
  PAGE_COUNT: 10
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
      res = await request(query);
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
      res = await request(recipeId);
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