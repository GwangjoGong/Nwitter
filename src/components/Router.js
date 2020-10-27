import React from 'react'
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Profile from 'routes/Profile'
import Auth from '../routes/Auth'
import Home from '../routes/Home'
import Navigation from './Navigation'

const AppRouter = ({ isLoggedIn, user, refreshUser }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation user={user} />}
      <Switch>
        {isLoggedIn ? (
          <InRoute user={user} refreshUser={refreshUser} />
        ) : (
          <OutRoute />
        )}
      </Switch>
    </Router>
  )
}

const InRoute = ({ user, refreshUser }) => (
  <>
    <Route exact path='/'>
      <Home user={user} />
    </Route>
    <Route exact path='/profile'>
      <Profile user={user} refreshUser={refreshUser} />
    </Route>
    <Redirect from='*' to='/' />
  </>
)

const OutRoute = () => (
  <>
    <Route exact path='/'>
      <Auth />
    </Route>
    <Redirect from='*' to='/' />
  </>
)

export default AppRouter
