import { authModalAtom } from '@/atoms/authModalState'
import { auth, db } from '@/firebase'
import Spinner from '@/utils/Spinner'
import { doc, setDoc } from 'firebase/firestore'
import { useSetAtom } from 'jotai'
import React, { useState } from 'react'
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from 'react-firebase-hooks/auth'

const SignUp = () => {
  const [fieldValues, setFieldValues] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
  })

  const [signUpError, setSignUpError] = useState('')

  const [user] = useAuthState(auth)

  const [createUserWithEmailAndPassword, _, loading, error] =
    useCreateUserWithEmailAndPassword(auth)

  const [updateProfile] = useUpdateProfile(auth)
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValues({
      ...fieldValues,
      [e.target.name]: e.target.value,
    })
  }

  const onSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // clear the error message
    setSignUpError('')
    try {
      if (fieldValues.password !== fieldValues.passwordConfirm) {
        throw new Error('password and passwordConfirm are not matched')
      }
      const userCred = await createUserWithEmailAndPassword(
        fieldValues.email,
        fieldValues.password
      )
      await updateProfile({
        displayName: fieldValues.email.split('@')[0],
      })
      // add to users db or useEffect is better??
      if (userCred) {
        await setDoc(
          doc(db, `users/${userCred.user.uid}`),
          JSON.parse(JSON.stringify(userCred.user))
        )
      }
    } catch (error: any) {
      setSignUpError(error.message)
    }
  }

  // // should use useEffect
  // useEffect(() => {
  //   if (userCred) {
  //     setDoc(
  //       doc(db, `users/${userCred.user.uid}`),
  //       JSON.parse(JSON.stringify(userCred.user))
  //     )
  //   }
  // }, [userCred])

  const setAuthModalState = useSetAtom(authModalAtom)
  return (
    <form className="w-full" onSubmit={onSignUp}>
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
          className="w-full h-[38px] p-2 mb-2 bg-gray-50 outline-none rounded-md hover:border-blue-500 border
          focus:ring-1 hover:bg-white placeholder:text-base"
        />
      </div>
      <div>
        <input
          onChange={onChange}
          placeholder="password confirm"
          name="passwordConfirm"
          type="password"
          className="w-full h-[38px] p-2 bg-gray-50 mb-4 outline-none rounded-md hover:border-blue-500 border
          focus:ring-1 hover:bg-white placeholder:text-base"
        />
      </div>
      {/* for showing error  */}
      <p className="text-[red] text-sm">
        {(error || signUpError) && (signUpError || error?.message)}
      </p>
      <button
        type="submit"
        className="w-full py-2 font-semibold text-white bg-blue-500 rounded-full hover:bg-blue-600"
      >
        {loading ? <Spinner /> : 'Sign Up'}
      </button>

      <div className="mt-2 text-sm">
        <p>
          Already a redditor?
          <span
            className="ml-2 text-blue-500 cursor-pointer hover:underline"
            onClick={() => setAuthModalState({ view: 'login', open: true })}
          >
            LOG IN
          </span>
        </p>
      </div>
    </form>
  )
}

export default SignUp
