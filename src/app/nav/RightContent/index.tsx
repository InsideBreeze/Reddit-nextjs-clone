'use client'
import React from 'react'
import AuthButtons from './AuthButtons'
import UserMenu from './UserMenu'
import AuthModal from '@/app/modals/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/firebase'
import Icons from './Icons'
import { User } from 'firebase/auth'

interface Props {
  user?: User | null
}
const RightContent = ({ user }: Props) => {
  return (
    <>
      <AuthModal />
      <div className="flex items-center space-x-2">
        {/* Icons */}
        {user ? <Icons /> : <AuthButtons />}

        {/* UserMenu */}
        <UserMenu user={user} />
      </div>
    </>
  )
}

export default RightContent
