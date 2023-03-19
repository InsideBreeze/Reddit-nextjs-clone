import { authModalAtom } from '@/atoms/authModalState'
import { auth } from '@/firebase'
import Spinner from '@/utils/Spinner'
import { useSetAtom } from 'jotai'
import React, { useState } from 'react'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'

const Login = () => {
  const [fieldValues, setFieldValues] = useState({
    email: '',
    password: '',
  })
  const setAuthModalState = useSetAtom(authModalAtom)

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValues({
      ...fieldValues,
      [e.target.name]: e.target.value,
    })
  }

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await signInWithEmailAndPassword(fieldValues.email, fieldValues.password)
  }
  return (
    <form className="w-full" onSubmit={onLogin}>
      <div>
        <input
          onChange={onChange}
          name="email"
          type="email"
          placeholder="email"
          className="w-full h-[38px] p-2 bg-gray-50 mb-2 outline-none pl-2 rounded-md border
          hover:border-blue-500 focus:ring-1 placeholder:text-base hover:bg-white placeholder:py-2 
          "
        />
      </div>

      <div>
        <input
          onChange={onChange}
          placeholder="password"
          name="password"
          type="password"
          className="w-full h-[38px] p-2 bg-gray-50 mb-4 outline-none rounded-md hover:border-blue-500 border
          focus:ring-1 hover:bg-white placeholder:text-base"
        />
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <button
          type="submit"
          className="w-full py-2 font-semibold text-white bg-blue-500 rounded-full hover:bg-blue-600"
        >
          Log in
        </button>
      )}
      <div className="mt-2 text-sm">
        <p>
          Forgot your password?{' '}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() =>
              setAuthModalState({ view: 'resetPassword', open: true })
            }
          >
            Reset
          </span>
        </p>
        <p>
          New here?{' '}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => setAuthModalState({ view: 'signUp', open: true })}
          >
            SIGN UP
          </span>
        </p>
      </div>
    </form>
  )
}

export default Login
