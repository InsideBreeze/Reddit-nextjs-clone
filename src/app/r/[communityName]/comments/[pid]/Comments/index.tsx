'use client'
import { auth, db } from '@/firebase'
import { User } from 'firebase/auth'
import {
  WriteBatch,
  addDoc,
  collection,
  doc,
  increment,
  serverTimestamp,
  setDoc,
  writeBatch,
} from 'firebase/firestore'
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Post } from '../../../../../../../types'

interface Props {
  user?: User | null
  post: Post
}
const Comments = ({ user, post }: Props) => {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)

  /*
    comment: {
        id,
        text,
        createdAt,
        creatorId,
        layer,
        creatorAvator
    }

    */
  const onCreateComment = async () => {
    const docRef = doc(collection(db, 'comments'))
    const newComment = {
      id: docRef.id,
      text,
      createdAt: serverTimestamp(),
      creatorId: user?.uid!,
      creatorAvator: user?.photoURL || '',
    }
    setLoading(true)
    try {
      const batch = writeBatch(db)
      batch.set(docRef, newComment)
      batch.update(doc(db, `posts/${post.id}`), {
        numberOfComments: increment(1),
      })
      await batch.commit()
    } catch (error) {
      console.log('onCreateComment', error)
    }
    setLoading(false)
  }
  return (
    <div className="bg-white px-[50px]">
      {user && (
        <div className="flex flex-col">
          <p>
            Comment as <span className="text-blue-700">{user.displayName}</span>
          </p>
          <textarea
            placeholder="what are your thoughts?"
            className="px-4 py-2 border outline-none focus:border-black h-[122px] rounded-t-md"
            onChange={e => setText(e.target.value)}
          />
          <div className="flex justify-end p-1 bg-gray-100">
            <button
              className="px-4 py-1 text-sm bg-blue-500 rounded-full disabled:opacity-60 disabled:text-white disabled:bg-gray-700"
              disabled={text.trim().length === 0}
              onClick={onCreateComment}
            >
              Comment
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Comments
