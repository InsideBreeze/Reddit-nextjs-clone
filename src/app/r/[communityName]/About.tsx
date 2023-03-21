import React from 'react'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { RiCakeLine } from 'react-icons/ri'

const About = () => {
  return (
    <div className="flex w-full flex-col">
      <div className="bg-blue-500 p-3 w-full justify-between items-center flex text-white rounded-t-md">
        <p className="font-medium text-sm">About Community</p>
        <BiDotsHorizontalRounded className="text-[22px]" />
      </div>
      <div className="p-3 bg-white rounded-b-md">
        <div className="divide-y-[1.5px] divide-gray-300">
          <div className="p-2 flex font-semibold">
            <div className="flex-1">
              <p>5</p>
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
            <button className="w-full bg-blue-500 mt-4 py-1 rounded-full hover:bg-blue-400">
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
