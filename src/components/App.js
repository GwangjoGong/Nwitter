import React, { useEffect, useState } from 'react'
import AppRouter from '../components/Router'
import { authService } from '../fbase'

function App() {
  const [init, setInit] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged(function (user) {
      if (user) {
        setUser({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args)
        })
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
        setUser(null)
      }
      setInit(true)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  const refreshUser = () => {
    const rUser = authService.currentUser
    setUser({
      displayName: rUser.displayName,
      uid: rUser.uid,
      updateProfile: (args) => rUser.updateProfile(args)
    })
  }

  return (
    <>
      {init ? (
        <AppRouter
          isLoggedIn={isLoggedIn}
          user={user}
          refreshUser={refreshUser}
        />
      ) : (
        'Initializing...'
      )}
    </>
  )
}

export default App
