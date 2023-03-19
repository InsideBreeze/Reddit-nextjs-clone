'use client'
import { Menu, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { AiFillHome, AiOutlinePlus } from 'react-icons/ai'
import { BiChevronDown } from 'react-icons/bi'
import CreateCommunity from '../modals/CreateCommunity'

const Directory = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <CreateCommunity isOpen={isOpen} closeModal={() => setIsOpen(false)} />
      <div className="flex items-center justify-center">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="flex items-center justify-center">
              <div className="flex items-center">
                <AiFillHome className="text-[23px] mr-1" />
                <p className="hidden font-semibold md:flex">Home</p>
              </div>

              <BiChevronDown className="text-[23px] text-gray-600 lg:ml-24" />
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
            <Menu.Items className="absolute w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg sm:-left-10 md:right-0 ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1 pl-2">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${'text-gray-900 font-[600]'} group flex w-full items-center rounded-md py-2 text-sm`}
                    >
                      <div
                        className={`${
                          active && 'bg-blue-600 text-white'
                        } flex items-center space-x-2 w-full rounded-sm p-1`}
                        onClick={() => setIsOpen(true)}
                      >
                        {/* create community */}
                        <AiOutlinePlus className="text-[23px]" />
                        <p>Create Community</p>
                      </div>
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </>
  )
}

export default Directory
