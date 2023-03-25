import { auth, db } from '@/firebase'
import Spinner from '@/utils/Spinner'
import { Dialog, Transition } from '@headlessui/react'
import { doc, runTransaction, serverTimestamp } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import React, { Fragment, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { AiFillEye } from 'react-icons/ai'
import { BsFillPersonFill } from 'react-icons/bs'
import { HiLockClosed } from 'react-icons/hi'

interface Props {
  isOpen: boolean
  closeModal: () => void
}

const CreateCommunity = ({ isOpen, closeModal }: Props) => {
  const [privacyType, setPrivacyType] = useState('public')

  const [communityName, setCommunityName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const [user] = useAuthState(auth)
  const router = useRouter()

  const remainingCount = 21 - communityName.length

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrivacyType(e.target.value)
  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 21) {
      return
    }
    setCommunityName(e.target.value)
  }

  const createCommunity = async () => {
    setError('')
    try {
      // check name is valid
      if (!/^[a-zA-Z]+_?[a-zA-Z]+$/.test(communityName)) {
        throw new Error('name can only contain alphatic and undersocre')
      }
      setLoading(true)
      const communityDocRef = doc(db, 'communities', communityName)
      await runTransaction(db, async transation => {
        const communityDoc = await transation.get(communityDocRef)
        // check name is not taken
        if (communityDoc.exists()) {
          throw new Error(`Sorry, /r/${communityName} is already taken`)
        }
        transation.set(communityDocRef, {
          createdAt: serverTimestamp(),
          numberOfMembers: 1,
          creatorId: user?.uid,
          privacyType: 'public',
        })
        // update user data
        transation.set(
          doc(db, `users/${user?.uid}/joinedCommunities`, communityName),
          {
            communityName,
            isModerator: true,
          }
        )
      })
      router.push(`/r/${communityName}`)
      closeModal()
    } catch (error: any) {
      setError(error.message)
    }
    setLoading(false)
  }
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex justify-center p-4 mt-10 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-[550px] overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="p-3 pb-3 text-lg font-medium leading-6 text-gray-900 border-b border-gray-200"
                  >
                    Create Community
                  </Dialog.Title>
                  <div className="p-3">
                    <p className="font-semibold">Name</p>
                    <p className="text-sm text-gray-600">
                      Community names including capitalization cannot be changed
                    </p>
                    <span className="relative pl-2 text-xl text-gray-300 top-7">
                      r/
                    </span>
                    <input
                      className="w-full h-8 pl-6 border rounded-md outline-none hover:border-blue-500 focus:ring-1"
                      value={communityName}
                      onChange={onInputChange}
                    />
                    <p
                      className={`text-sm ${
                        remainingCount === 0 ? 'text-[red]' : 'text-gray-400'
                      }`}
                    >
                      {remainingCount} characters remaining
                    </p>
                    <div className="mt-4">
                      <p className="text-[red] text-sm">{error && error}</p>
                      <p className="font-medium">Community Type</p>
                      <div className="flex items-center space-x-1 text-gray-600">
                        <input
                          onChange={onChange}
                          type="checkbox"
                          value="public"
                          checked={privacyType === 'public'}
                        />
                        <BsFillPersonFill className="text-[15px]" />
                        <p>Public</p>
                        <p className="text-sm">
                          Any one can view, post, and comment to this community
                        </p>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-600">
                        <input
                          onChange={onChange}
                          value="restricted"
                          type="checkbox"
                          checked={privacyType === 'restricted'}
                        />
                        <AiFillEye className="text-[15px]" />
                        <p>Restricted</p>
                        <p className="text-sm">
                          Anyone can view this community, but only approved
                          users can post
                        </p>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-600">
                        <input
                          onChange={onChange}
                          value="private"
                          type="checkbox"
                          checked={privacyType === 'private'}
                        />
                        <HiLockClosed className="text-[15px]" />
                        <p>Public</p>
                        <p className="text-sm">
                          Only approved users can view and submit to his
                          community
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end p-4 mt-4 space-x-3 bg-gray-100">
                    <button
                      className="px-3 py-1 font-semibold border border-blue-500 rounded-full"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    {loading ? (
                      <Spinner />
                    ) : (
                      <button
                        className="px-3 py-1 font-semibold text-white bg-blue-500 rounded-full hover:bg-blue-600"
                        onClick={createCommunity}
                      >
                        Create Community
                      </button>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default CreateCommunity
