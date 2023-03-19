import React from 'react'
import { Community } from '../../../../types'
import Image from 'next/image'
import { BsReddit } from 'react-icons/bs'

interface Props {
  community: Community
}
const Header = ({ community }: Props) => {
  return (
    <div className="h-[146px]">
      <p className="bg-blue-500 h-[50%]" />
      <div className="h-[50%] bg-white">
        <div className="border border-[red] w-[95%] max-w-[860px] mx-auto">
          <div className="flex">
            {community.communityImage ? (
              <Image height="0" width="0" alt="" src="" />
            ) : (
              <BsReddit className="text-[64px] text-brand-100 relative -top-3 rounded-[50%] border-4 border-white" />
            )}
            <div className="flex py-[10px] px-4 space-x-4">
              <div>
                <p className="text-lg font-semibold">
                  {community.communityName}
                </p>
                <p className="text-gray-600 font-sm">
                  r/{community.communityName}
                </p>
              </div>
              <button
                className="border border-blue-500 h-[28px] px-6 text-white 
              rounded-full bg-blue-500 font-semibold hover:bg-blue-600"
              >
                Join
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
