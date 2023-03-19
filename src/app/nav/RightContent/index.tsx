'use client'
import React from 'react'
import AuthButtons from './AuthButtons'
import UserMenu from './UserMenu'
import AuthModal from '@/app/modals/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/firebase'
import Icons from './Icons'

const RightContent = () => {
  const [user] = useAuthState(auth)
  return (
    <>
      <AuthModal />
      <div className="flex items-center space-x-2">
        {/* Icons */}
        {user ? <Icons /> : <AuthButtons />}

        {/* UserMenu */}
        <UserMenu />
      </div>
    </>
  )
}

export default RightContent
