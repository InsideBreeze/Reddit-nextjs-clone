'use client'
import { db } from '@/firebase'
import Spinner from '@/utils/Spinner'
import { User } from 'firebase/auth'
import {
  Timestamp,
  collection,
  doc,
  getDocs,
  increment,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
  writeBatch,
} from 'firebase/firestore'
import { useCallback, useEffect, useState } from 'react'
import { SiGooglemessages } from 'react-icons/si'
import { Comment, Post } from '../../../../../../../types'
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

  const [replies, setReplies] = useState<Comment[]>)([])

  const getReplies = useCallback(async (id: string) => {
    const repliesQuery = query(
      collection(db, 'comments'),
      where('parentId', '==', id)
    )
    getDocs(repliesQuery).then(result => {
      setReplies(result.docs.map(doc => doc.data() as Comment))
    })
  }, [])

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
      parentId: post.id, // comment or reply?
    }
    setLoading(true)
    try {
      const batch = writeBatch(db)
      batch.set(docRef, newComment)
      batch.update(doc(db, `posts/${post.id}`), {
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
  const onDeleteComment = async (id: string) => {
    try {
      const batch = writeBatch(db)
      batch.delete(doc(db, `comments/${id}`))
      batch.update(doc(db, `posts/${post.id}`), {
        numberOfComments: increment(-1),
      })
      await batch.commit()
    } catch (error) {
      console.log('onDeleteComment', error)
    }
  }

  useEffect(() => {
    const commentsQuery = query(
      collection(db, 'comments'),
      where('parentId', '==', post.id),
      orderBy('createdAt', 'desc')
    )
    const unsubscribe = onSnapshot(commentsQuery, snapshot => {
      setComments(
        snapshot.docs.map(
          doc =>
          ({
            ...doc.data(),
          } as Comment)
        )
      )
    })
    return () => {
      unsubscribe()
    }
  }, [post.id])

  return (
    <div className="bg-white px-[50px] pb-3">
      {user && (
        <div className="mb-3 flex flex-col text-sm focus:border-black">
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
      )}
      {comments.length > 0 ? (
        <CommentList
          comments={comments}
          onDeleteComment={onDeleteComment}
          user={user}
        />
      ) : (
        <div className="h-[340px] w-full flex items-center justify-center">
          <div className="flex flex-col items-center space-y-3 text-gray-600">
            <SiGooglemessages className="text-[30px]" />
            <p className="font-medium">No Comments Yet</p>
            <p className="text-sm">Be the first to share what you think!</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Comments
