import React from 'react'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { RiCakeLine } from 'react-icons/ri'
import { Community } from '../../../../types'
import { db } from '@/firebase'
import { getDoc, doc } from 'firebase/firestore'

interface Props {
  community?: Community
  communityName?: string
}

const About = async ({ community, communityName }: Props) => {
  //if community is undefined, fetch it?? but how can I know the name of community?
  // there are two situations to use this component, know commmunityData or only Know the name of community from router

  let communityData: Community
  if (community) {
    communityData = community
  } else if (communityName) {
    const communityDoc = await getDoc(doc(db, 'communities', communityName))

    const communityDocData = communityDoc.data()
    JSON.parse(
      JSON.stringify({
        communityName,
        ...communityDocData,
        createdAt: communityDocData?.createdAt.toJSON(),
      })
    ) as Community
  }
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
              <p>{communityData.numberOfMembers.toLocaleString()}</p>
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
