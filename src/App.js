import React from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import posed, { PoseGroup } from 'react-pose';
import shortid from 'shortid';
import Header from './Header'
import Recipes from './Recipes'
import Recipe from './Recipe'
import './app.css'

// routes animation container
const AnimatedRoutes = posed.div({
  enter: {
    opacity: 1,
    y: 0,
    staggerChildren: 50,
    beforeChildren: true,
    delay: 300
  },
  exit: {
    opacity: 0,
    y: 90,
    staggerChildren: 20,
    staggerDirection: -1
  }
});

const INIT_QUERY = 'burger';

function App({ location, history }) {
  return (
    <>
      <Header history={history} initQuery={INIT_QUERY} />
      <div className="container">
        <PoseGroup>
          <AnimatedRoutes key={shortid.generate()}>
            <Switch location={location}>
              <Route path="/recipes/:query" component={Recipes} />
              <Route path="/recipe/:id" component={Recipe} />
              <Redirect to={`/recipes/${INIT_QUERY}`} />
            </Switch>
          </AnimatedRoutes>
        </PoseGroup>
      </div>
    </>
  )
}

export default withRouter(App);