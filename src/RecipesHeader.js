import React from 'react'

export default function RecipesHeader({ recipes, sortProps, sortProp, doSort }) {
  return (
    <div className="recipes-header alert text-light mt-3 d-flex justify-content-between align-items-center" role="alert">
      <span>
        <strong>Found: </strong>
        <strong>{recipes.length} </strong>
        recipe(s)
        from <strong>{[...recipes].unique('publisher').length} </strong>
        publisher(s) ...
      </span>
      <div className="w-50">
        <label className="my-1 mr-3" htmlFor="sort-by">Sort By:</label>
        <i className={`fas fa-sort-alpha-${sortProp.includes('-')? 'up' : 'down'}`}></i>
        <div className="btn-group">
          {Object.keys(sortProps).map( key => (
            <button key={key} type="button"
                className={`btn btn-primary btn-sm ${sortProp.includes(key)? 'active' : ''}`}
                id={key}
                value={key}
                onClick={doSort} >
              {sortProps[key]}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}