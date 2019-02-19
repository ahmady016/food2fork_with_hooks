import { useState, useEffect } from 'react'
import axios from 'axios'
import LS from './localStorage'

const API = {
  KEY: 'd3ab033003c2e546e131f5b45402e3e9',
  BASE_URL: 'https://cors-anywhere.herokuapp.com/http://food2fork.com/api',
  PAGE_COUNT: 10
}

async function request(req) {
  const [ method, url, body = null ] = req;
  try {
    const { data } = await axios[method](url, body);
    if (data.error)
      return data.error;
    if(!data)
      return 'Not found!';
    return data;
  } catch(error) {
    return error.message;
  }
}

async function getData(req, key, setState) {
  setState({
    loading: true,
    error: '',
    data: {}
  });
  let data = LS.get(key);
  if(data)
    setState({
      loading: false,
      error: '',
      data: data
    });
  else {
    data = await request(req);
    if(typeof data === 'string')
      setState({
        loading: false,
        error: data,
        data: {}
      });
    else {
      LS.set(key, JSON.stringify(data));
      setState({
        loading: false,
        error: '',
        data: data
      });
    }
  }
}

export function getUrl({ q, rId }) {
  const searchURL = `${API.BASE_URL}/search?key=${API.KEY}&q=`;
  const detailsURL = `${API.BASE_URL}/get?key=${API.KEY}&rId=`;
  const url = (q)
    ? searchURL + q
    : detailsURL + rId;
  return url;
}

export function useFetch(req, key) {
  const [state, setState] = useState({
    loading: true,
    error: '',
    data: {}
  });
  useEffect( () => {
    getData(req, key, setState);
  }, []);
  return state;
}