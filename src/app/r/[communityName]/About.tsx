'use client'
import dayjs from 'dayjs'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { RiCakeLine } from 'react-icons/ri'
import { Community } from '../../../../types'
import { useRouter } from 'next/navigation'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db, storage } from '@/firebase'
import { BsReddit } from 'react-icons/bs'
import Image from 'next/image'
import { useRef, useState } from 'react'
import useSelectFile from '@/hooks/useSelectFile'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { doc, updateDoc } from 'firebase/firestore'
import { useAtom, useSetAtom } from 'jotai'
import { communityStateAtom } from '@/atoms/communityDataState'
import Spinner from '@/utils/Spinner'

interface Props {
  community: Community
}

const About = ({ community }: Props) => {
  const router = useRouter()
  const [user] = useAuthState(auth)

  const fileRef = useRef<HTMLInputElement>(null)
  const { selectedFile, setSelectedFile, onSelectFile } = useSelectFile()
  const [loading, setLoading] = useState(false)

  const [communityState, setCommunityState] = useAtom(communityStateAtom)

  const uploadImage = async () => {
    // upload the data and update the state

    setLoading(true)
    try {
      const imageRef = ref(
        storage,
        `/communities/${community.communityName}/image`
      )
      await uploadString(imageRef, selectedFile, 'data_url')
      const downloadURL = await getDownloadURL(imageRef)

      await updateDoc(doc(db, `communities/${community.communityName}`), {
        communityImage: downloadURL,
      })
      setCommunityState(prev => ({
        ...prev,
        currentCommunity: {
          ...prev.currentCommunity!,
          communityImage: downloadURL,
        },
      }))
      setSelectedFile('')
    } catch (error) {
      console.log('upload Image', error)
    }
    setLoading(false)
    // update state
  }
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
              <p className="text-sm">
                {dayjs(new Date(community.createdAt?.seconds * 1000)).format(
                  'MMM DD, YYYY'
                )}
              </p>
            </div>
            <button
              className="w-full py-1 mt-4 bg-blue-500 rounded-full hover:bg-blue-400"
              onClick={() =>
                router.push(`/r/${community.communityName}/submit`)
              }
            >
              Create Post
            </button>
          </div>
          {user?.uid === community.creatorId && (
            <div className="p-2">
              <p className="font-semibold">Admin</p>
              <div className="flex justify-between">
                <p
                  className="text-sm text-blue-500 hover:underline hover:cursor-pointer"
                  onClick={() => fileRef.current?.click()}
                >
                  Change Image
                </p>
                <input
                  type="file"
                  className="hidden"
                  ref={fileRef}
                  onChange={onSelectFile}
                />
                {community.communityImage || selectedFile ? (
                  <Image
                    src={
                      selectedFile ||
                      (communityState.currentCommunity
                        ?.communityImage as string)
                    }
                    height={35}
                    width={35}
                    alt=""
                    className="rounded-full"
                  />
                ) : (
                  <BsReddit className="text-[30px] text-brand-100" />
                )}
              </div>
              {selectedFile &&
                (loading ? (
                  <Spinner />
                ) : (
                  <div className="flex justify-between text-sm">
                    <p onClick={uploadImage} className="cursor-pointer">
                      Save change
                    </p>
                    <p
                      onClick={() => {
                        setSelectedFile('')
                        fileRef.current!.value = ''
                      }}
                      className="cursor-pointer"
                    >
                      cancel
                    </p>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default About
