'use client'
import { authModalAtom } from '@/atoms/authModalState'
import { auth } from '@/firebase'
import { useSetAtom } from 'jotai'
import { useState } from 'react'
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth'
import { BsDot, BsReddit } from 'react-icons/bs'

const ResetPassword = () => {
  const setAuthModalState = useSetAtom(authModalAtom)
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(false)

  const [sendPasswordResetEmail] = useSendPasswordResetEmail(auth)

  const onSendEmail = async () => {
    await sendPasswordResetEmail(email)
    setSuccess(true)
  }
  return (
    <div className="flex flex-col justify-center space-y-2 text-center">
      <div className="flex justify-center">
        <BsReddit className="text-[40px] text-brand-100" />
      </div>
      <p>Reset your password</p>
      {success ? (
        <div>The reset email is sent successfully, please check :)</div>
      ) : (
        <>
          <input
            placeholder="email"
            className="h-10 pl-2 border rounded-md outline-none bg-gray-50 hover:border-blue-500 focus:ring-1 hover:bg-white"
            onChange={e => setEmail(e.target.value)}
          />
          <button
            className="w-full py-1 text-white bg-blue-500 rounded-full hover:bg-blue-600"
            onClick={onSendEmail}
          >
            Reset Password
          </button>
          <p>
            Enter the email associated with your account and we will send you a
            reset link
          </p>
        </>
      )}

      <p className="flex items-center justify-center text-blue-500">
        <span
          className="cursor-pointer"
          onClick={() => setAuthModalState({ view: 'login', open: true })}
        >
          LOGIN
        </span>{' '}
        <BsDot />
        <span
          className="cursor-pointer"
          onClick={() => setAuthModalState({ view: 'signUp', open: true })}
        >
          SIGNUP
        </span>
      </p>
    </div>
  )
}

export default ResetPassword
