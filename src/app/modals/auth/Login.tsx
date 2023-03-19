import { authModalAtom } from '@/atoms/authModalState'
import { useSetAtom } from 'jotai'
import React, { useState } from 'react'

const Login = () => {
  const [fieldValues, setFieldValues] = useState({
    email: '',
    password: '',
  })
  const setAuthModalState = useSetAtom(authModalAtom)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValues({
      ...fieldValues,
      [e.target.name]: e.target.value,
    })
  }
  return (
    <form className="w-full" onSubmit={() => {}}>
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
      <button
        type="submit"
        className="w-full bg-blue-500 py-2 rounded-full text-white font-semibold hover:bg-blue-600"
      >
        Log in
      </button>
      <div className="mt-2 text-sm">
        <p>
          Forgot your password?{' '}
          <span className="text-blue-500 cursor-pointer hover:underline">
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
