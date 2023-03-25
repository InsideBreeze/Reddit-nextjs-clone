'use client'
import { authModalAtom } from '@/atoms/authModalState'
import { createCommunityAtom } from '@/atoms/createCommunityModalState'
import { userLocalAtom } from '@/atoms/userLocalState'
import { useAtomValue, useSetAtom } from 'jotai'
import Image from 'next/image'

const PersonalHome = () => {
  const setCommunityModal = useSetAtom(createCommunityAtom)
  const setAuthModalState = useSetAtom(authModalAtom)
  const user = useAtomValue(userLocalAtom)
  return (
    <div className="">
      <div className="bg-[url('/images/home-banner.png')] w-full h-[34px]">
        {' '}
      </div>
      <div className="p-3 bg-white">
        <div className="flex space-x-2">
          <Image
            src="/images/snoo-home.png"
            alt="snoo"
            height={68}
            width={40}
            className="h-[68px] w-[40px] -mt-[23px]"
          />

          <p className="">Home</p>
        </div>
        <p className="py-3 text-sm border-b border-gray-300">
          Your personal Reddit frontpage. Come here to check in with your
          favorite communities.
        </p>
        <div className="flex flex-col mt-3 space-y-3 bg-white">
          {/* Todo: open modals */}
          <button
            className="py-1 font-medium text-white bg-blue-500 rounded-full"
            onClick={() => {}}
          >
            Create Post
          </button>
          <button
            className="py-1 font-medium text-blue-500 bg-white border border-blue-500 rounded-full"
            onClick={() => {
              if (user) {
                setCommunityModal(true)
              } else {
                setAuthModalState({ view: 'login', open: true })
                setCommunityModal(true)
              }
            }}
          >
            Create Community
          </button>
        </div>
      </div>
    </div>
  )
}

export default PersonalHome
