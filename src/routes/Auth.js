import React from 'react'
import { authService, fbInstance } from '../fbase'
import AuthForm from '../components/AuthForm'

const Auth = () => {
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
      <AuthForm />
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
