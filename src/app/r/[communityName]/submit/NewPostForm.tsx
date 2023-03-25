import { db, storage } from '@/firebase'
import useSelectFile from '@/hooks/useSelectFile'
import { User } from 'firebase/auth'
import {
  doc,
  Timestamp,
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  setDoc,
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { IconType } from 'react-icons'
import { BiPoll } from 'react-icons/bi'
import { BsLink45Deg, BsMic } from 'react-icons/bs'
import { IoDocumentText, IoImageOutline } from 'react-icons/io5'
import TabItem from './TabItem'
import TextInputs from './TextInputs'
import UploadImage from './UploadImage'

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

interface Props {
  communityName: string
  user: User
}
const NewPostForm = ({ communityName, user }: Props) => {
  const [seletedTab, setSeletedTab] = useState('Post')
  const [fieldValues, setFieldValues] = useState({
    title: '',
    body: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { selectedFile, setSelectedFile, onSelectFile } = useSelectFile()

  const router = useRouter()

  const onTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFieldValues({
      ...fieldValues,
      [e.target.name]: e.target.value,
    })
  }

  // essential function
  const createPost = async () => {
    setLoading(true)
    try {
      const postRef = doc(collection(db, 'posts'))
      const newPost = {
        id: postRef.id,
        title: fieldValues.title,
        body: fieldValues.body,
        creatorId: user.uid,
        createdAt: serverTimestamp() as Timestamp,
        communityName: communityName,
        numberOfComments: 0,
        numberOfVotes: 0,
        creatorName: user.displayName!,
      }

      const postDoc = await setDoc(postRef, newPost)
      if (selectedFile) {
        const imageRef = ref(storage, `/posts/${postRef.id}/image`)
        await uploadString(imageRef, selectedFile, 'data_url')
        const downloadURL = await getDownloadURL(imageRef)

        // then update the doc
        await updateDoc(postRef, {
          postImage: downloadURL,
        })
      }
      router.back()
    } catch (error: any) {
      setError(error.message)
    }
    setLoading(false)
  }

  return (
    <div className="bg-white rounded-md">
      {error && <p className="text-[red] text-sm text-center">{error}</p>}
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
        <TextInputs
          fieldValues={fieldValues}
          onTextChange={onTextChange}
          createPost={createPost}
          loading={loading}
        />
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
  )
}

export default NewPostForm
