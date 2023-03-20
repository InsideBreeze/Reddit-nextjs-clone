'use client'
import React, { useState } from 'react'
import PageContent from '../PageContent'
import { IconType } from 'react-icons'
import { IoDocumentText, IoImageOutline } from 'react-icons/io5'
import { BsLink45Deg, BsMic } from 'react-icons/bs'
import { BiPoll } from 'react-icons/bi'
import TabItem from './TabItem'

interface TabItem {
  Icon: IconType
  name: string
}

const tabs: TabItem[] = [
  {
    Icon: IoDocumentText,
    name: 'Post',
  },
  {
    Icon: IoImageOutline,
    name: 'Image & Video',
  },
  {
    Icon: BsLink45Deg,
    name: 'Link',
  },
  {
    Icon: BiPoll,
    name: 'Poll',
  },
  {
    Icon: BsMic,
    name: 'Talk',
  },
]
const SubmitPage = () => {
  const [seletedTab, setSeletedTab] = useState('Post')
  return (
    <PageContent>
      <>
        <div className="py-4">
          <p className="text-lg font-medium py-[14px] border-b border-white">
            Create a post
          </p>
        </div>
        <div className="flex bg-white">
          {tabs.map(tab => (
            <TabItem
              key={tab.name}
              Icon={tab.Icon}
              name={tab.name}
              selected={seletedTab === tab.name}
              setSeletedTab={() => setSeletedTab(tab.name)}
            />
          ))}
        </div>
      </>

      <></>
    </PageContent>
  )
}

export default SubmitPage
