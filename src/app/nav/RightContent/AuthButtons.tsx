'use client'
import React from 'react'
import { useSetAtom } from 'jotai'
import { authModalAtom } from '@/atoms/authModalState'
const AuthButtons = () => {
  const setAuthModalState = useSetAtom(authModalAtom)
  return (
    <>
      <button
        onClick={() => setAuthModalState({ view: 'login', open: true })}
        className="flex items-center justify-center bg-white text-blue-500 border 
      border-blue-500 rounded-full  px-3 md:px-6 h-[28px] font-semibold hover:bg-gray-100 text-sm"
      >
        Login
      </button>
      <button
        className="flex items-center justify-center bg-blue-700 text-white border 
      border-blue-500 rounded-full px-3 md:px-6 h-[28px] font-semibold hover:bg-blue-500 text-sm"
      >
        Sign up
      </button>
    </>
  )
}

export default AuthButtons
