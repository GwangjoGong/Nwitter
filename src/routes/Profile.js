import { authService } from 'fbase'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Profile = ({ user, refreshUser }) => {
  const [newDName, setNewDName] = useState(user.displayName)

  const history = useHistory()
  const onClickLogout = () => {
    authService.signOut()
    history.push('/')
  }

  const onChange = (event) => {
    setNewDName(event.target.value)
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    if (user.displayName !== newDName) {
      //Update
      await user.updateProfile({ displayName: newDName })
      refreshUser()
    }
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          value={newDName}
          type='text'
          placeholder='Display Name'
          onChange={onChange}
        />
        <input type='submit' value='Update Profile' />
      </form>
      <button onClick={onClickLogout}>Log Out</button>
    </>
  )
}

export default Profile
