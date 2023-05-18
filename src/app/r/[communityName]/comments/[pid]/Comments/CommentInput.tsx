'use client'
import { db } from '@/firebase'
import Spinner from '@/utils/Spinner'
import { User } from 'firebase/auth'
import {
  Timestamp,
  collection,
  doc,
  increment,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore'
import React, { useState } from 'react'

interface Props {
  user: User
  id: string
}

const CommentInput = ({ user, id }: Props) => {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)

  const onCreateComment = async () => {
    const docRef = doc(collection(db, 'comments'))
    const newComment = {
      id: docRef.id,
      text,
      createdAt: serverTimestamp() as Timestamp,
      creatorId: user?.uid!,
      creatorName: user?.displayName,
      creatorAvator: user?.photoURL || '',
      postId: id,
      parentId: id, // comment or reply?
    }
    setLoading(true)
    try {
      const batch = writeBatch(db)
      batch.set(docRef, newComment)
      batch.update(doc(db, `posts/${id}`), {
        numberOfComments: increment(1),
      })
      await batch.commit()
      // setComments([newComment as Comment, ...comments])
    } catch (error) {
      console.log('onCreateComment', error)
    }
    setLoading(false)
    setText('')
  }
  return (
    <div className="flex flex-col text-sm focus:border-black">
      <p>
        Comment as{' '}
        <span className="text-blue-700 hover:underline hover:cursor-pointer">
          {user.displayName}
        </span>
      </p>
      <textarea
        value={text}
        placeholder="what are your thoughts?"
        className="px-4 py-2 border outline-none  max-h-[122px] rounded-t-md min-h-[122px]"
        onChange={e => setText(e.target.value)}
      />
      <div className="flex justify-end p-1 bg-gray-100">
        {loading ? (
          <Spinner />
        ) : (
          <button
            className="flex items-center justify-center px-4 py-1 text-sm text-white bg-blue-500 rounded-full disabled:opacity-60 disabled:bg-gray-700"
            disabled={text.trim().length === 0}
            onClick={onCreateComment}
          >
            <p>Comment</p>
          </button>
        )}
      </div>
    </div>
  )
}

export default CommentInput
