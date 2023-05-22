import Image from 'next/image'
import { useEffect, useState } from 'react'
import { BsChat, BsDot, BsReddit } from 'react-icons/bs'
import { TiArrowDownOutline, TiArrowUpOutline } from 'react-icons/ti'
import { Comment } from '../../../../../../../types'
import CommentMenu from './CommentMenu'

import { useRedditStore } from '@/app/store'
import { authModalAtom } from '@/atoms/authModalState'
import { db } from '@/firebase'
import Spinner from '@/utils/Spinner'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { User } from 'firebase/auth'
import {
  Timestamp,
  collection,
  doc,
  increment,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore'
import { useSetAtom } from 'jotai'
import CommentList from './CommentList'

dayjs.extend(relativeTime)
interface Props {
  comment: Comment
  onDeleteComment: (id: string) => void
  user?: User | null
}
const CommentItem = ({ comment, onDeleteComment, user }: Props) => {
  const [openReply, setOpenReply] = useState(false)

  const [text, setText] = useState('')
  const [replies, setReplies] = useState<Comment[]>([])
  const [loading, setLoading] = useState(false)
  const setAuthModalState = useSetAtom(authModalAtom)

  const posts = useRedditStore(state => state.posts)
  const setPosts = useRedditStore(state => state.setPosts)

  const onSendReply = async () => {
    if (!user) {
      setAuthModalState({ view: 'login', open: true })
      return
    }
    try {
      const replyDocRef = doc(collection(db, `comments`))
      const newReply = {
        id: replyDocRef.id,
        text,
        createdAt: serverTimestamp() as Timestamp,
        creatorId: user?.uid as string,
        creatorName: user?.displayName,
        creatorAvator: user?.photoURL || '',
        postId: comment.postId,
        parentId: comment.id,
      }

      setText('')
      setLoading(true)

      // add a new reply to comments collection first
      await setDoc(doc(db, `comments/${replyDocRef.id}`), newReply)
      await updateDoc(doc(db, `posts/${comment.postId}`), {
        numberOfComments: increment(1),
      })
      setOpenReply(false)
      setPosts(
        posts!.map(p =>
          p.id === comment.postId
            ? { ...p, numberOfComments: p.numberOfComments + 1 }
            : p
        )
      )
    } catch (error) {
      console.log('onSendReply error', error)
    }
    setLoading(false)
  }

  useEffect(() => {
    const repliesQuery = query(
      collection(db, 'comments'),
      where('parentId', '==', comment.id)
    )

    const unsubscribe = onSnapshot(repliesQuery, snapshot => {
      setReplies(
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
  }, [comment.id])

  return (
    <div className="relative  flex bg-[red">
      <span className="w-[2px] absolute bg-gray-300 h-[calc(100%-34px)] left-[15px] top-[32px] hover:bg-blue-500 hover:cursor-pointer" />
      <div>
        <div className="flex mt-0 space-x-2">
          {comment.creatorAvator ? (
            <Image
              src={comment.creatorAvator}
              width={30}
              height={30}
              alt=""
              className="rounded-full w-[30px] h-[30px]"
            />
          ) : (
            <BsReddit className="text-[30px] text-brand-100" />
          )}
          <div className="flex-1">
            <div className="flex items-center">
              <p className="cursor-pointer hover:underline">
                {comment.creatorName}
              </p>
              <BsDot className="text-[12px] text-gray-400" />
              <p className="text-xs text-gray-500">
                {dayjs(comment?.createdAt?.toDate()).fromNow()}
              </p>
            </div>
            <p className="my-2">{comment.text}</p>
            <div className="flex items-center space-x-2 text-gray-600">
              <div className="flex items-center space-x-1">
                <div className="navButton">
                  <TiArrowUpOutline className="text-[20px]" />
                </div>
                <p>{0}</p>
                <div className="navButton">
                  <TiArrowDownOutline className="text-[20px]" />
                </div>
              </div>
              <div
                className="flex items-center space-x-1 navButton"
                onClick={() => setOpenReply(!openReply)}
              >
                <BsChat className="text-[20px]" />
                <p className="text-sm font-[500]">Reply</p>
              </div>
              <div className="text-sm font-medium navButton">Share</div>
              <CommentMenu
                onDeleteComment={() => onDeleteComment(comment.id)}
                creatorId={comment.creatorId}
              />
            </div>
            {openReply && (
              <div className="flex flex-col ml-5 bg-[red] my-2">
                <textarea
                  value={text}
                  onChange={e => setText(e.target.value)}
                  placeholder="What are your thoughts?"
                  className="py-2 px-4 w-full border outline-none min-h-[120px] max-h-[120px]"
                />
                <div className="flex justify-end p-1 space-x-2 bg-gray-100 item-center">
                  <button
                    className="text-sm font-medium text-blue-500"
                    onClick={() => setOpenReply(false)}
                  >
                    Cancel
                  </button>
                  {loading ? (
                    <Spinner />
                  ) : (
                    <button
                      className="px-5 py-1 text-sm text-white bg-blue-500 rounded-full hover:bg-blue-600 disabled:opacity-60 disabled:text-white disabled:bg-gray-700"
                      disabled={text.trim().length === 0}
                      onClick={onSendReply}
                    >
                      Reply
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        {replies.length > 0 && (
          <div className="mx-5">
            <CommentList
              comments={replies}
              user={user}
              onDeleteComment={onDeleteComment}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default CommentItem
