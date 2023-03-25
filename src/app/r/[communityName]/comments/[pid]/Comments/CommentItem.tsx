import Image from 'next/image'
import { useEffect, useState } from 'react'
import { BsChat, BsDot, BsReddit } from 'react-icons/bs'
import { TiArrowDownOutline, TiArrowUpOutline } from 'react-icons/ti'
import { Comment } from '../../../../../../../types'
import CommentMenu from './CommentMenu'

import { db } from '@/firebase'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { User } from 'firebase/auth'
import {
  Timestamp,
  collection,
  doc,
  getDocs,
  increment,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore'
import CommentList from './CommentList'
import Spinner from '@/utils/Spinner'

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

  const onSendReply = async () => {
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
      setLoading(true)

      // add a new reply to comments collection first
      await setDoc(doc(db, `comments/${replyDocRef.id}`), newReply)
      // don't need to
      //await setDoc(replyDocRef, newReply)

      await updateDoc(doc(db, `posts/${comment.postId}`), {
        numberOfComments: increment(1),
      })

      setText('')
      setOpenReply(false)
    } catch (error) {
      console.log('onSendReply error', error)
    }
    setLoading(false)
  }

  const repliesQuery = query(
    collection(db, 'comments'),
    where('parentId', '==', comment.id)
  )
  useEffect(
    () =>
      onSnapshot(repliesQuery, snapshot => {
        setReplies(snapshot.docs.map(doc => doc.data() as Comment))
      }),
    [comment.id]
  )

  return (
    <div className="relative">
      <span className="w-[2px] absolute bg-gray-300 h-[70%] left-3 top-9 overflow-hidden hover:bg-blue-500 hover:cursor-pointer" />
      <div className="flex mt-2 space-x-2">
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
            <CommentMenu onDeleteComment={() => onDeleteComment(comment.id)} />
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
  )
}

export default CommentItem
