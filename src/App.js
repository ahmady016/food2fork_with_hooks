import React from 'react'
import Header from './Header';
import Recipes from './Recipes';
import './app.css'

export default function App() {
  return (
    <>
      <Header/>
      <div className="container">
        <Recipes />
      </div>
    </>
  )
}