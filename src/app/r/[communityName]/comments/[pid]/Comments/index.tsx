'use client'
import { auth, db } from '@/firebase'
import { User } from 'firebase/auth'
import {
  Timestamp,
  WriteBatch,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
  writeBatch,
} from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Comment, Post } from '../../../../../../../types'
import Spinner from '@/utils/Spinner'
import CommentList from './CommentList'

interface Props {
  user?: User | null
  post: Post
  communityName: string
}
const Comments = ({ user, post, communityName }: Props) => {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [comments, setComments] = useState<Comment[]>([])

  const onCreateComment = async () => {
    const docRef = doc(collection(db, 'comments'))
    const newComment = {
      id: docRef.id,
      text,
      createdAt: serverTimestamp() as Timestamp,
      creatorId: user?.uid!,
      creatorName: user?.displayName,
      creatorAvator: user?.photoURL || '',
      postId: post.id,
    }
    setLoading(true)
    try {
      const batch = writeBatch(db)
      batch.set(docRef, newComment)
      batch.update(doc(db, `posts/${post.id}`), {
        numberOfComments: increment(1),
      })
      await batch.commit()
      setComments([newComment as Comment, ...comments])
    } catch (error) {
      console.log('onCreateComment', error)
    }
    setLoading(false)
    setText('')
  }
  const onDeleteComment = async (id: string) => {
    try {
      const batch = writeBatch(db)
      batch.delete(doc(db, `comments/${id}`))
      batch.update(doc(db, `posts/${post.id}`), {
        numberOfComments: increment(-1),
      })
      await batch.commit()
      setComments(comments.filter(comment => comment.id !== id))
    } catch (error) {
      console.log('onDeleteComment', error)
    }
  }

  const fetchComments = async () => {
    try {
      const commentsQuery = query(
        collection(db, 'comments'),
        where('postId', '==', post.id),
        orderBy('createdAt', 'desc')
      )
      const commentsRef = await getDocs(commentsQuery)
      setComments(
        commentsRef.docs.map(
          doc =>
            ({
              ...doc.data(),
            } as Comment)
        )
      )
    } catch (error) {
      console.log('fetchComments', error)
    }
  }
  useEffect(() => {
    fetchComments()
  }, [])

  return (
    <div className="bg-white px-[50px]">
      {user && (
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
                className="flex items-center justify-center px-4 py-1 text-sm bg-blue-500 rounded-full disabled:opacity-60 disabled:text-white disabled:bg-gray-700"
                disabled={text.trim().length === 0}
                onClick={onCreateComment}
              >
                <p>Comment</p>
              </button>
            )}
          </div>
        </div>
      )}
      <CommentList
        comments={comments}
        onDeleteComment={onDeleteComment}
        user={user}
      />
    </div>
  )
}

export default Comments
