import { Transition, Dialog } from '@headlessui/react'
import React, { Fragment, useState } from 'react'
import { AiFillEye } from 'react-icons/ai'
import { BsFillPersonFill } from 'react-icons/bs'
import { HiLockClosed } from 'react-icons/hi'

interface Props {
  isOpen: boolean
  closeModal: () => void
}

const CreateCommunity = ({ isOpen, closeModal }: Props) => {
  const [privacyType, setPrivacyType] = useState('public')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrivacyType(e.target.value)
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
                    <input className="w-full h-8 pl-6 border rounded-md outline-none hover:border-blue-500 focus:ring-1" />
                    <p className="text-sm text-gray-400">
                      {21} characters remaining
                    </p>
                    <div className="mt-4">
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
                    <button
                      className="px-3 py-1 font-semibold text-white bg-blue-500 rounded-full"
                      onClick={() => {}}
                    >
                      Create Community
                    </button>
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
