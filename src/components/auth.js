import React, {useState} from 'react';
import {auth, googleProvider} from '../config/firebase-config'
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'

export const Auth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signIn = async () => {
    try {

    await createUserWithEmailAndPassword(auth, email, password)
    } catch (err) {
      console.error(err)
    }
  }

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth,googleProvider)
    } catch (err) {
      console.error(err)
    }
  }

  const logout =  async () => {
    try {
      await signOut(auth)
    }catch (e) {
      console.error(e)
    }
  }

  console.log(auth?.currentUser?.email)

  return (
    <div>
      <input placeholder='Email...' onChange={event => setEmail(event.target.value)}/>
      <input placeholder='Password' type='password' onChange={e => setPassword(e.target.value)}/>
      <button onClick={signIn}>Sign in</button>

      <button onClick={signInWithGoogle}>Sign in With Google</button>
      <button onClick={logout}>Logout</button>
    </div>
  )
};