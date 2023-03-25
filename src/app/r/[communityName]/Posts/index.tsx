'use client'
import { db } from '@/firebase'
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Community, Post } from '../../../../../types'
import PostItem from './PostItem'
import usePosts from '@/hooks/usePosts'
import PostsLoader from './PostsLoader'
import { useAtomValue } from 'jotai'
import { communityStateAtom } from '@/atoms/communityDataState'

interface Props {
  communityName: string
}
const Posts = ({ communityName }: Props) => {
  const [posts, setPosts] = useState<Post[]>([])

  const { postDataState, setPostDataState } = usePosts()
  const [loading, setLoading] = useState(false)
  const { currentCommunity } = useAtomValue(communityStateAtom)

  const q = query(
    collection(db, 'posts'),
    where('communityName', '==', currentCommunity?.communityName),
    orderBy('createdAt', 'desc')
  )

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const postDocs = await getDocs(q)

      setPostDataState(prev => ({
        ...prev,
        posts: postDocs.docs.map(
          doc =>
            ({
              ...doc.data(),
              id: doc.id,
            } as Post)
        ),
      }))
    } catch (error) {
      console.log('fetchPosts', error)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCommunity?.communityName])

  // useEffect(
  //   () =>
  //     onSnapshot(q, snapshot => {
  //       setPosts(
  //         snapshot.docs.map(
  //           doc =>
  //             ({
  //               id: doc.id,
  //               ...doc.data(),
  //             } as Post)
  //         )
  //       )
  //     }),
  //   [q]
  // )

  return (
    <>
      {loading ? (
        <PostsLoader />
      ) : (
        <div className="">
          {postDataState.posts.map(post => (
            <PostItem post={post} key={post.id} />
          ))}
        </div>
      )}
    </>
  )
}

export default Posts
