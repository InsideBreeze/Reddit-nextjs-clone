'use client'
import { authModalAtom } from '@/atoms/authModalState'
import { auth } from '@/firebase'
import { useSetAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import { useAuthState } from 'react-firebase-hooks/auth'
import { BsLink45Deg, BsReddit } from 'react-icons/bs'
import { HiOutlinePhotograph } from 'react-icons/hi'
interface Props {
  communityName?: string
}
const CreatePostLink = ({ communityName }: Props) => {
  const [user] = useAuthState(auth)
  const router = useRouter()
  const setAuthModalState = useSetAtom(authModalAtom)

  const handleClick = () => {
    if (user) {
      router.push(`/r/${communityName}/submit`)
    } else {
      setAuthModalState({ view: 'login', open: true })
    }
  }
  return (
    <div className="flex items-center p-2 mb-4 space-x-3 text-gray-400 bg-white">
      <BsReddit className="text-[34px]" />
      <input
        className="w-full pl-2 border rounded-md outline-none bg-gray-50 h-9 hover:border-blue-500"
        placeholder="Create Post"
        onClick={handleClick}
      />
      {/* icons */}
      <div className="flex items-center justify-center">
        <HiOutlinePhotograph className="text-[24px]" />
      </div>
      <div className="flex items-center justify-center">
        <BsLink45Deg className="text-[26px]" />
      </div>
    </div>
  )
}

export default CreatePostLink
