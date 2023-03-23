'use client'
import { postDataAtom } from '@/atoms/postDataState'
import { auth, db } from '@/firebase'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import {
  deleteDoc,
  doc,
  getDoc,
  increment,
  writeBatch,
} from 'firebase/firestore'
import { useAtom, useAtomValue } from 'jotai'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { BsBookmark, BsChat } from 'react-icons/bs'
import { FiTrash } from 'react-icons/fi'
import { RiShareForwardLine } from 'react-icons/ri'
import {
  TiArrowDownOutline,
  TiArrowDownThick,
  TiArrowUpOutline,
  TiArrowUpThick,
} from 'react-icons/ti'
import { Post } from '../../../../../types'
import { useRouter } from 'next/navigation'
import { communityStateAtom } from '@/atoms/communityDataState'

dayjs.extend(relativeTime)

interface Props {
  post: Post
  communityName: string
  isPostPage?: boolean
}
const PostItem = ({ post, isPostPage, communityName }: Props) => {
  const [postDataState, setPostDataState] = useAtom(postDataAtom)
  const [user] = useAuthState(auth)
  const [voteStatus, setvoteStatus] = useState(0)

  const router = useRouter()

  const communityState = useAtomValue(communityStateAtom)

  const onSelectPost = () => {
    if (!isPostPage) {
      router.push(
        `/r/${communityState.currentCommunity?.communityName}/comments/${post.id}`
      )
    }
    setPostDataState(prev => ({
      ...prev,
      selectedPost: post,
    }))
  }
  const onDelete = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    // this is relative easy
    await deleteDoc(doc(db, `posts/${post.id}`))

    if (isPostPage) {
      router.push(`/r/${communityName}`)
    }

    // update posts state(cache).
    setPostDataState(prev => ({
      ...prev,
      posts: prev.posts.filter(item => item.id !== post.id),
    }))
  }

  // I think maybe it's not that hard, maybe I am wrong.
  // the logic is pretty clear...
  // so in the db, votedPost can only be 1 or -1 value
  const onUpVote = async (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    console.log('update post id', post)
    e.stopPropagation()
    /* if vote status:
       0: create doc with vote status 1, then the votes number of post +1
       1: delete doc, then # votes number -1
       -1: update doc with vote status 1, then # vote number + 2
       */

    try {
      const batch = writeBatch(db)
      if (voteStatus === 0) {
        batch.set(doc(db, `users/${user?.uid}/votedPosts/${post.id}`), {
          voteStatus: 1,
        })
        batch.update(doc(db, `posts/${post.id}`), {
          numberOfVotes: increment(1),
        })
        await batch.commit()
        // update the state? yeah
        setPostDataState(prev => ({
          ...prev,
          posts: prev.posts.map(item =>
            item.id === post.id
              ? { ...item, numberOfVotes: item.numberOfVotes + 1 }
              : item
          ),
        }))
        setvoteStatus(1)
      } else if (voteStatus === 1) {
        batch.delete(doc(db, `users/${user?.uid}/votedPosts/${post.id}`))
        batch.update(doc(db, `posts/${post.id}`), {
          numberOfVotes: increment(-1),
        })
        await batch.commit()
        setPostDataState(prev => ({
          ...prev,
          posts: prev.posts.map(item =>
            item.id === post.id
              ? { ...item, numberOfVotes: item.numberOfVotes - 1 }
              : item
          ),
        }))
        console.log('set vote status', 0)
        setvoteStatus(0)
      } else {
        batch.update(doc(db, `users/${user?.uid}/votedPosts/${post.id}`), {
          voteStatus: 1,
        })
        batch.update(doc(db, `posts/${post.id}`), {
          numberOfVotes: increment(2),
        })
        await batch.commit()

        setPostDataState(prev => ({
          ...prev,
          posts: prev.posts.map(item =>
            item.id === post.id
              ? { ...item, numberOfVotes: item.numberOfVotes + 2 }
              : item
          ),
        }))
        setvoteStatus(1)
      }
    } catch (error) {
      console.log('onUpVote', error)
    }
  }

  // the logic is the same as the upvote function
  const onDownVote = async (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.stopPropagation()
    /* if vote status:
       - 0: create doc with vote status -1, then the votes number of post -1
       - 1: update doc with vote status -1, then # votes number - 2
       - -1: delete the doc, then # vote number + 1
       */

    try {
      const batch = writeBatch(db)
      if (voteStatus === 0) {
        batch.set(doc(db, `users/${user?.uid}/votedPosts/${post.id}`), {
          voteStatus: -1,
        })
        batch.update(doc(db, `posts/${post.id}`), {
          numberOfVotes: increment(-1),
        })
        await batch.commit()
        // update the state? yeah
        setPostDataState(prev => ({
          ...prev,
          posts: prev.posts.map(item =>
            item.id === post.id
              ? { ...item, numberOfVotes: item.numberOfVotes - 1 }
              : item
          ),
        }))
        setvoteStatus(-1)
      } else if (voteStatus === 1) {
        batch.update(doc(db, `users/${user?.uid}/votedPosts/${post.id}`), {
          voteStatus: -1,
        })
        batch.update(doc(db, `posts/${post.id}`), {
          numberOfVotes: increment(-2),
        })
        await batch.commit()

        setPostDataState(prev => ({
          ...prev,
          posts: prev.posts.map(item =>
            item.id === post.id
              ? { ...item, numberOfVotes: item.numberOfVotes - 2 }
              : item
          ),
        }))
        setvoteStatus(-1)
      } else {
        batch.delete(doc(db, `users/${user?.uid}/votedPosts/${post.id}`))
        batch.update(doc(db, `posts/${post.id}`), {
          numberOfVotes: increment(1),
        })
        await batch.commit()
        setPostDataState(prev => ({
          ...prev,
          posts: prev.posts.map(item =>
            item.id === post.id
              ? { ...item, numberOfVotes: item.numberOfVotes + 1 }
              : item
          ),
        }))
        console.log('hmmm?')
        setvoteStatus(0)
      }
    } catch (error) {
      console.log('onDownVote', error)
    }
  }

  // fetch current post vote status
  useEffect(() => {
    console.log('not running?')
    getDoc(doc(db, `users/${user?.uid}/votedPosts/${post.id}`)).then(docRef => {
      if (docRef.exists()) {
        setvoteStatus(docRef.data().voteStatus)
        console.log('setVoteStatus')
      }
    })
  }, [post.id, user?.uid])

  console.log('voteState', voteStatus)
  return (
    <div
      className={`flex ${!isPostPage && 'cursor-pointer mt-4'} rounded-xl`}
      onClick={onSelectPost}
    >
      <div
        className={`flex flex-col items-center px-3 pt-2 text-gray-700 bg-gray-50 ${
          isPostPage && 'rounded-tl-md bg-white'
        }`}
      >
        {voteStatus === 1 ? (
          <TiArrowUpThick
            className="text-brand-100 cursor-pointer text-[25px]"
            onClick={onUpVote}
          />
        ) : (
          <TiArrowUpOutline
            className="text-[23px] cursor-pointer hover:text-brand-100"
            onClick={onUpVote}
          />
        )}
        <p
          className={`${voteStatus === 1 && 'text-brand-100'}
        ${voteStatus === -1 && 'text-blue-500'}
        `}
        >
          {post.numberOfVotes}
        </p>
        {voteStatus === -1 ? (
          <TiArrowDownThick
            className="text-blue-500 cursor-pointer text-[25px]"
            onClick={onDownVote}
          />
        ) : (
          <TiArrowDownOutline
            className="text-[23px] cursor-pointer "
            onClick={onDownVote}
          />
        )}
      </div>
      <div className={`flex-1 p-2 bg-white ${isPostPage && 'rounded-tr-md'}`}>
        <div className="text-sm">
          Posted by u/{post.creatorName}{' '}
          {dayjs(post.createdAt.toDate()).fromNow()}
        </div>
        <div className="font-semibold">{post.title}</div>
        <div className="text-sm">{post.body}</div>
        {post.postImage && (
          <Image
            src={post.postImage}
            height={460}
            width={460}
            className="max-w-[460px] max-h-[460px] p-4"
            alt=""
            priority
          />
        )}

        <div className="flex space-x-4 text-gray-700 flex-start">
          <div className="postIcon">
            <BsChat className="w-4 h-4" />
            <p className="text-sm">{post.numberOfComments}</p>
          </div>
          <div className="postIcon">
            <RiShareForwardLine className="text-[20px]" />
            <p className="text-sm">Share</p>
          </div>
          <div className="postIcon">
            <BsBookmark className="text-[16px]" />
            <p className="text-sm">Save</p>
          </div>
          {user?.uid === post.creatorId && (
            <div className="postIcon" onClick={onDelete}>
              <FiTrash className="w-4 h-4" />
              <p className="text-sm">Delete</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PostItem
