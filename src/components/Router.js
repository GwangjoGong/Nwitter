import React, { useState } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Auth from '../routes/Auth'
import Home from '../routes/Home'

const AppRouter = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  return (
    <Router>
      <Switch>{isLoggedIn ? <InRoute /> : <OutRoute />}</Switch>
    </Router>
  )
}

const InRoute = () => (
  <>
    <Route exact path='/'>
      <Home />
    </Route>
  </>
)

const OutRoute = () => (
  <>
    <Route exact path='/'>
      <Auth />
    </Route>
  </>
)

export default AppRouter
