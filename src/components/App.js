import React, { useEffect, useState } from 'react'
import AppRouter from 'components/Router'
import { authService } from 'fbase'

function App() {
  const [init, setInit] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    authService.onAuthStateChanged(function (user) {
      if (user) {
        setIsLoggedIn(true)
        setUser(user)
      } else {
        setIsLoggedIn(false)
        setUser(null)
      }
      setInit(true)
    })
  }, [])

  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={isLoggedIn} user={user} />
      ) : (
        'Initializing...'
      )}
    </>
  )
}

export default App
