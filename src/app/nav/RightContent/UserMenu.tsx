'use client'
import { authModalAtom } from '@/atoms/authModalState'
import { auth } from '@/firebase'
import { Menu, Transition } from '@headlessui/react'
import { User, signOut } from 'firebase/auth'
import { useSetAtom } from 'jotai'
import { Fragment } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { BiChevronDown } from 'react-icons/bi'
import { CgProfile } from 'react-icons/cg'
import { CiLogin, CiLogout } from 'react-icons/ci'
import { FaRedditSquare } from 'react-icons/fa'
import { IoSparkles } from 'react-icons/io5'

interface Props {
  user?: User | null
}

const UserMenu = ({ user }: Props) => {
  const setAuthModalState = useSetAtom(authModalAtom)
  return (
    <div className="flex items-center justify-center">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="flex items-center justify-center outline-none">
            {user ? (
              <div className="flex items-center">
                <div>
                  <FaRedditSquare className="text-[25px] text-gray-400" />
                </div>
                <div className="flex-col hidden ml-1 mr-4 text-xs md:flex">
                  <p className="font-semibold text-left">{user?.displayName}</p>
                  <p className="flex items-center space-x-1">
                    <IoSparkles className="text-[10px] text-[#FF3c00]" />
                    <span>1 karma</span>
                  </p>
                </div>
              </div>
            ) : (
              <CgProfile className="text-[27px] text-gray-400" />
            )}
            <BiChevronDown className="text-[23px] text-gray-600" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1 pl-2">
              {user && (
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${'text-gray-900 font-[600]'} group flex w-full items-center rounded-md py-2 text-sm`}
                    >
                      <div
                        className={`${
                          active && 'bg-blue-600 text-white'
                        } flex items-center space-x-2 w-full rounded-sm p-1`}
                      >
                        <CgProfile className="text-[23px]" />
                        <p>Profile</p>
                      </div>
                    </button>
                  )}
                </Menu.Item>
              )}
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${'text-gray-900 font-[600]'} group flex w-full items-center rounded-md py-2 text-sm`}
                  >
                    {user ? (
                      <div
                        className={`${
                          active && 'bg-blue-600 text-white'
                        } flex items-center space-x-2 w-full rounded-sm p-1`}
                        onClick={() => signOut(auth)}
                      >
                        <CiLogout className="text-[25px]" />
                        <p>Logout</p>
                      </div>
                    ) : (
                      <div
                        className={`${
                          active && 'bg-blue-600 text-white'
                        } flex items-center space-x-2 w-full rounded-sm py-1`}
                        onClick={() =>
                          setAuthModalState({ view: 'login', open: true })
                        }
                      >
                        <CiLogin className="text-[25px]" />
                        <p>Login / Sign Up</p>
                      </div>
                    )}
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export default UserMenu
