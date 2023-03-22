import React from 'react'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { RiCakeLine } from 'react-icons/ri'
import { Community } from '../../../../types'
import { db } from '@/firebase'
import { getDoc, doc } from 'firebase/firestore'

interface Props {
  community: Community
}

const About = ({ community }: Props) => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between w-full p-3 text-white bg-blue-500 rounded-t-md">
        <p className="text-sm font-medium">About Community</p>
        <BiDotsHorizontalRounded className="text-[22px]" />
      </div>
      <div className="p-3 bg-white rounded-b-md">
        <div className="divide-y-[1.5px] divide-gray-300">
          <div className="flex p-2 font-semibold">
            <div className="flex-1">
              <p>{community.numberOfMembers.toLocaleString()}</p>
              <p>Members</p>
            </div>
            <div className="flex-1">
              <p>1</p>
              <p>online</p>
            </div>
          </div>
          <div className="p-2">
            <div className="flex space-x-2">
              <RiCakeLine />
              <p className="text-sm">Created Mars 15, 2023</p>
            </div>
            <button className="w-full py-1 mt-4 bg-blue-500 rounded-full hover:bg-blue-400">
              Create Post
            </button>
          </div>
          <div className="p-2">
            <p>Admin</p>
            <div className="flex justify-between">
              <p>Change Image</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
