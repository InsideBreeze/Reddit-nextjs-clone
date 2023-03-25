import React from 'react'
import Premium from './Premium'
import PersonalHome from './PersonalHome'

const Sidebar = () => {
  return (
    <div className="space-y-4">
      <Premium />
      <PersonalHome />
      <div className="px-3 py-2 text-xs bg-white divide-y-[1px] divide-gray-100 rounded-md">
        <div className="flex pb-3">
          <div className="flex-1 space-y-1">
            <p className="cursor-pointer">User Agreement</p>
            <p className="cursor-pointer">Privacy Policy</p>
          </div>
          <div className="flex-1 space-y-1">
            <p className="cursor-pointer">Content Policy</p>
            <p className="cursor-pointer">Moderator Code Of Conduct</p>
          </div>
        </div>
        <div>
          <div className="flex py-3">
            <div className="flex-1 space-y-1">
              <p className="cursor-pointer">English</p>
              <p className="cursor-pointer">Deutsch</p>
            </div>
            <div className="flex-1 space-y-1">
              <p className="cursor-pointer">Français</p>
              <p className="cursor-pointer">Español</p>
            </div>
            <div className="flex-1 space-y-1">
              <p className="cursor-pointer">Italiano</p>
              <p className="cursor-pointer">Português</p>
            </div>
          </div>
        </div>
        <div className="py-2 cursor-pointer">
          Reddit Inc © 2023. All rights reserved
        </div>
      </div>
    </div>
  )
}

export default Sidebar
