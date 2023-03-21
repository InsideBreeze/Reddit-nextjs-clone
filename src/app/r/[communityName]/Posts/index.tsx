'use client'
import { db } from '@/firebase'
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Community, Post } from '../../../../../types'
import PostItem from './PostItem'

interface Props {
  community: Community
}
const Posts = ({ community }: Props) => {
  const [posts, setPosts] = useState<Post[]>([])

  const q = query(
    collection(db, 'posts'),
    where('communityName', '==', community.communityName),
    orderBy('createdAt', 'desc')
  )

  // fetch posts to state, then retritive them

  // const fetchPosts = async () => {
  //   const postDocs =
  // }

  useEffect(
    () =>
      onSnapshot(q, snapshot => {
        setPosts(
          snapshot.docs.map(
            doc =>
              ({
                id: doc.id,
                ...doc.data(),
              } as Post)
          )
        )
      }),
    [q]
  )

  console.log('posts', posts)

  return (
    <div className="">
      {posts.map(post => (
        <PostItem post={post} key={post.id} />
      ))}
    </div>
  )
}

export default Posts
