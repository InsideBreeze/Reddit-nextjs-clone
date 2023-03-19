'use client'
import React from 'react'
import { BsReddit } from 'react-icons/bs'
import { HiOutlinePhotograph } from 'react-icons/hi'
import { BsLink45Deg } from 'react-icons/bs'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/firebase'
import { useSetAtom } from 'jotai'
import { authModalAtom } from '@/atoms/authModalState'
interface Props {
  communityName: string
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
    <div className="flex items-center p-2 text-gray-400 bg-white flex-between">
      <BsReddit className="text-[32px]" />
      <input
        className="w-full pl-2 border rounded-md outline-none bg-gray-50 h-9 hover:border-blue-500"
        placeholder="Create Post"
        onClick={handleClick}
      />
      {/* icons */}
      <HiOutlinePhotograph className="text-[28px]" />
      <BsLink45Deg className="text-[28px]" />
    </div>
  )
}

export default CreatePostLink
