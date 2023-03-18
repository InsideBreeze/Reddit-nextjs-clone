"use client";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { BiChevronDown } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { CiLogin } from "react-icons/ci";

const UserMenu = () => {
  return (
    <div className="flex items-center justify-center">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="flex items-center justify-center">
            <CgProfile className="text-[27px] text-gray-400" />
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
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${"text-gray-900 font-[600]"} group flex w-full items-center rounded-md py-2 text-sm`}
                  >
                    <div
                      className={`${
                        active && "bg-blue-600 text-white"
                      } flex items-center space-x-2 w-full rounded-sm py-1`}
                    >
                      <CiLogin className="text-[25px]" />
                      <p>Login / Sign Up</p>
                    </div>
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default UserMenu;
