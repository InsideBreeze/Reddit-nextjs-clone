'use client'
import React from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useAtom } from 'jotai'
import { authModalAtom } from '@/atoms/authModalState'
import Login from './Login'
import SignUp from './SignUp'
import ResetPassword from './ResetPassword'
import { MdClose } from 'react-icons/md'
import OAuthButtons from './OAuthButtons'

const AuthModal = () => {
  const [authModalState, setAuthModalState] = useAtom(authModalAtom)

  function closeModal() {
    setAuthModalState(prev => ({ ...prev, open: false }))
  }

  return (
    <>
      <Transition appear show={authModalState.open} as={Fragment}>
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
            <div className="flex mt-10 justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative flex flex-col w-full max-w-md transform overflow-hidden rounded-2xl bg-white px-16 py-2 shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className=" text-lg font-medium leading-6 text-gray-900 text-center mb-4"
                  >
                    {authModalState.view === 'login' && 'Login'}
                    {authModalState.view === 'signUp' && 'SignUp'}
                    {authModalState.view === 'resetPassword' &&
                      'Reset Password'}
                    <div
                      className="flex items-center justify-center p-1 ml-auto cursor-pointer absolute right-3 top-2 hover:bg-opacity-30 hover:bg-gray-300 rounded-md"
                      onClick={() =>
                        setAuthModalState(prev => ({ ...prev, open: false }))
                      }
                    >
                      <MdClose className="text-[20px]" />
                    </div>
                  </Dialog.Title>
                  {authModalState.view === 'resetPassword' ? (
                    <ResetPassword />
                  ) : (
                    <>
                      <OAuthButtons />
                      {authModalState.view === 'login' && <Login />}
                      {authModalState.view === 'signUp' && <SignUp />}
                    </>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default AuthModal
