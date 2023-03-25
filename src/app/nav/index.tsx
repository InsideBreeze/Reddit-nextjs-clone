'use client'
import { communityStateAtom } from '@/atoms/communityDataState'
import { auth } from '@/firebase'
import { useSetAtom } from 'jotai'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuthState } from 'react-firebase-hooks/auth'
import Directory from './Directory'
import RightContent from './RightContent'
import SearchInput from './SearchInput'

const Navbar = () => {
  const [user] = useAuthState(auth)

  const router = useRouter()

  const backToHome = () => {
    router.push('/')
  }
  return (
    <div className="bg-white h-[49px] px-3 md:px-[20px] flex items-center justify-between">
      {/* logo */}
      {/* you can set w and h by css from next13 */}
      <div className="flex items-center cursor-pointer" onClick={backToHome}>
        <div className="py-2 pr-2">
          <Image
            src="/images/redditFace.svg"
            alt="reddit_logo"
            width="0"
            height="0"
            className="w-7 h-7 xl:w-8"
          />
        </div>

        <Image
          className="mr-[20px] hidden md:flex"
          src="/images/Reddit_Logotype_OnWhite.svg"
          width={57}
          height={18}
          alt=""
        />
      </div>

      {/* directory */}
      {user && <Directory />}

      {/* search input */}
      <SearchInput />

      <RightContent user={user} />

      {/* Icons */}

      {/* usre menu */}
    </div>
  )
}

export default Navbar
