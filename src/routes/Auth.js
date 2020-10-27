import React, { useState } from 'react'
import { authService, fbInstance } from 'fbase'

const Auth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newAccount, setNewAccount] = useState(true)
  const [error, setError] = useState('')

  const onChange = (event) => {
    console.log(event.target.name)
    const { name, value } = event.target
    switch (name) {
      case 'email':
        setEmail(value)
        break
      case 'password':
        setPassword(value)
        break
      default:
        break
    }
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      if (newAccount) {
        // create account
        const data = await authService.createUserWithEmailAndPassword(
          email,
          password
        )
        console.log(data)
      } else {
        //login
        const data = await authService.signInWithEmailAndPassword(
          email,
          password
        )
        console.log(data)
      }
    } catch (err) {
      alert(err.message)
    }
  }

  const toggleAccount = () => {
    setNewAccount(!newAccount)
  }

  const onSocialClick = async (event) => {
    try {
      const { name } = event.target
      let provider
      switch (name) {
        case 'google':
          provider = new fbInstance.auth.GoogleAuthProvider()
          break
        case 'github':
          provider = new fbInstance.auth.GithubAuthProvider()
          break
        default:
          break
      }

      await authService.signInWithPopup(provider)
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={email}
          onChange={onChange}
          type='email'
          name='email'
          placeholder='Email'
          required
        />
        <input
          value={password}
          onChange={onChange}
          type='password'
          name='password'
          placeholder='Password'
          required
        />
        <input type='submit' value={newAccount ? 'Create Account' : 'Log In'} />
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? 'Log In' : 'Create Account'}{' '}
      </span>
      <div>
        <button name='google' onClick={onSocialClick}>
          Continue with Google
        </button>
        <button name='github' onClick={onSocialClick}>
          Continue with Github
        </button>
      </div>
    </div>
  )
}

export default Auth
