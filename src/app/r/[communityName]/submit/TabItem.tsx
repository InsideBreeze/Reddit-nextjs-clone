import React from 'react'
import { IconType } from 'react-icons'

type TabItemProps = {
  Icon: IconType
  name: string
  selected: boolean
  selectTab: () => void
}

const TabItem = ({ Icon, name, selected, selectTab }: TabItemProps) => {
  return (
    // grow !== flex-1
    <div
      className={`py-[14px] grow flex border-r border-gray-200 items-center justify-center space-x-2 cursor-pointer ${
        selected
          ? 'text-blue-500 border-b-[2px] border-b-blue-500'
          : 'text-gray-500 border-b-[1px]'
      } hover:bg-gray-50`}
      onClick={selectTab}
    >
      <Icon className="text-[20px]" />
      <p className="text-base font-medium">{name}</p>
    </div>
  )
}
export default TabItem
