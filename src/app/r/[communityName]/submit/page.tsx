'use client'
import React, { useState } from 'react'
import PageContent from '../PageContent'
import { IconType } from 'react-icons'
import { IoDocumentText, IoImageOutline } from 'react-icons/io5'
import { BsLink45Deg, BsMic } from 'react-icons/bs'
import { BiPoll } from 'react-icons/bi'
import TabItem from './TabItem'
import NewPostForm from './NewPostForm'
import UploadImage from './UploadImage'
import useSelectFile from '@/hooks/useSelectFile'

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
  const [fieldValues, setFieldValues] = useState({
    title: '',
    body: '',
  })

  const { selectedFile, setSelectedFile, onSelectFile } = useSelectFile()

  const onTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFieldValues({
      ...fieldValues,
      [e.target.name]: e.target.value,
    })
  }

  // essential function
  const createPost = () => {}
  return (
    <PageContent>
      <>
        <div className="py-">
          <p className="text-lg font-medium py-[14px] border-b border-white">
            Create a post
          </p>
        </div>
        <div className="bg-white rounded-md">
          <div className="flex">
            {tabs.map(tab => (
              <TabItem
                key={tab.name}
                Icon={tab.Icon}
                name={tab.name}
                selected={seletedTab === tab.name}
                selectTab={() => setSeletedTab(tab.name)}
              />
            ))}
          </div>
          {/* send post/image form */}
          {seletedTab === 'Post' && (
            <NewPostForm onTextChange={onTextChange} createPost={createPost} />
          )}
          {seletedTab === 'Image & Video' && (
            <UploadImage
              onSelectFile={onSelectFile}
              selectedFile={selectedFile}
              clearSelectedFile={() => setSelectedFile('')}
              backToPost={() => setSeletedTab('Post')}
            />
          )}
        </div>
      </>

      <></>
    </PageContent>
  )
}

export default SubmitPage
