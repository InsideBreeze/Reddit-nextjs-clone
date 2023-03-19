'use client'
import React, { useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useAtom } from 'jotai'
import { authModalAtom } from '@/atoms/authModalState'
import Login from './Login'
import SignUp from './SignUp'
import ResetPassword from './ResetPassword'
import { MdClose } from 'react-icons/md'
import OAuthButtons from './OAuthButtons'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/firebase'

const AuthModal = () => {
  const [authModalState, setAuthModalState] = useAtom(authModalAtom)

  const [user] = useAuthState(auth)

  // sync user state
  useEffect(() => {
    if (user) {
      setAuthModalState(prev => ({ ...prev, open: false }))
    }
  }, [user, setAuthModalState])

  console.log(user)
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
                <Dialog.Panel className="relative flex flex-col w-full max-w-md px-20 py-2 overflow-hidden transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="mb-4 text-lg font-medium leading-6 text-center text-gray-900 "
                  >
                    {authModalState.view === 'login' && 'Login'}
                    {authModalState.view === 'signUp' && 'SignUp'}
                    {authModalState.view === 'resetPassword' &&
                      'Reset Password'}
                    <div
                      className="absolute flex items-center justify-center p-1 ml-auto rounded-md cursor-pointer right-3 top-2 hover:bg-opacity-30 hover:bg-gray-300"
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
