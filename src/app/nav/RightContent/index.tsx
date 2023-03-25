'use client'
import AuthModal from '@/app/modals/auth'
import { User } from 'firebase/auth'
import AuthButtons from './AuthButtons'
import Icons from './Icons'
import UserMenu from './UserMenu'

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
