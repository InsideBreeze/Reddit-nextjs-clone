import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { AiOutlineBell, AiOutlineEdit } from 'react-icons/ai'
import { BsThreeDots } from 'react-icons/bs'
import { FiTrash } from 'react-icons/fi'
import { HiOutlineBookmark } from 'react-icons/hi'

interface Props {
  onDeleteComment: () => void
}
const CommentMenu = ({ onDeleteComment }: Props) => {
  return (
    <div className="flex items-center">
      <Menu as="div" className="relative inline-block text-center ">
        <div className="flex items-center p-1 rounded-md hover:bg-gray-200">
          <Menu.Button className="">
            <BsThreeDots className="text-[20px]" />
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
          <Menu.Items className="absolute left-0 z-50 w-56 mt-1 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <div
                    className={`flex items-center space-x-2 ${
                      active && 'bg-gray-100 text-black cursor-pointer'
                    } px-2 py-2 w-full rounded-md text-gray-600`}
                  >
                    <HiOutlineBookmark className="text-[20px]" />
                    <p className="text-sm">Save</p>
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div
                    className={`flex items-center space-x-2 ${
                      active && 'bg-gray-100 text-black cursor-pointer'
                    } px-2 py-2 w-full rounded-md text-gray-600`}
                  >
                    <AiOutlineEdit className="text-[20px]" />
                    <p className="text-sm">Edit</p>
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div
                    className={`flex items-center space-x-2 ${
                      active && 'bg-gray-100 text-black cursor-pointer'
                    } px-2 py-2 w-full rounded-md text-gray-600`}
                  >
                    <AiOutlineBell className="text-[20px]" />
                    <p className="text-sm">Follow</p>
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div
                    className={`flex items-center space-x-2 ${
                      active && 'bg-gray-100 text-black cursor-pointer'
                    } px-2 py-2 w-full rounded-md text-gray-600`}
                    onClick={onDeleteComment}
                  >
                    <FiTrash className="text-[20px]" />
                    <p className="text-sm">Delete comment</p>
                  </div>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export default CommentMenu
