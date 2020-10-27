import { authService } from 'fbase'
import React from 'react'
import { useHistory } from 'react-router-dom'

const Profile = () => {
  const history = useHistory()
  const onClickLogout = () => {
    authService.signOut()
    history.push('/')
  }
  return (
    <>
      <button onClick={onClickLogout}>Log Out</button>
    </>
  )
}

export default Profile
