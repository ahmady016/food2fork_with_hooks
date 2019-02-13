import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from 'react-dom';
import addExtensions from './extensions'
import App from './App';
import './index.css';

addExtensions();

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);