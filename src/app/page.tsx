'use client'
import { auth, db } from '@/firebase'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Post } from '../../types'
import { useAtom, useAtomValue } from 'jotai'
import { communityStateAtom } from '@/atoms/communityDataState'
import PageContent from './r/[communityName]/PageContent'
import PostsLoader from './r/[communityName]/Posts/PostsLoader'
import CreatePostLink from './r/[communityName]/CreatePostLink'
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import PostItem from './r/[communityName]/Posts/PostItem'
import { postDataAtom } from '@/atoms/postDataState'
import Premium from './sidebar/Premium'
import PersonalHome from './sidebar/PersonalHome'
import Sidebar from './sidebar'

export default function Home() {
  // home feeds with user is logged and user isn't logged
  // top communities
  // premium
  //
  // fetch joinedCommunities
  const [user, userLoading] = useAuthState(auth)
  const [loading, setLoading] = useState(false)
  const [postData, setPostData] = useAtom(postDataAtom)

  const communityState = useAtomValue(communityStateAtom)

  const buildUserHomeFeed = async () => {
    setLoading(true)
    try {
      const communityNames = communityState.joinedCommunities.map(
        c => c.communityName
      )
      const postsQuery = query(
        collection(db, 'posts'),
        where('communityName', 'in', communityNames),
        orderBy('createdAt', 'desc'),
        limit(10)
      )
      const postDocs = await getDocs(postsQuery)
      setPostData(prev => ({
        ...prev,
        posts: postDocs.docs.map(post => ({ ...post.data() } as Post)),
      }))
    } catch (error) {
      console.log('buildUserHomeFeed', error)
    }
    setLoading(false)

    // if user have not join any communities yet
  }

  const buildNoUserHomeFeed = async () => {
    setLoading(true)
    try {
      const postsQuery = query(
        collection(db, 'posts'),
        orderBy('createdAt', 'desc'),
        limit(10)
      )
      const postDocs = await getDocs(postsQuery)

      setPostData(prev => ({
        ...prev,
        posts: postDocs.docs.map(post => ({ ...post.data() } as Post)),
      }))
    } catch (error) {
      console.log('buildNoUserHomeFeed', error)
    }
    setLoading(false)
  }

  console.log('joined communities', communityState.joinedCommunities)
  console.log('selected posts', postData.posts)

  // useEffect(() => {
  //   if (!user && !userLoading) {
  //     buildNoUserHomeFeed()
  //   }
  // }, [user, userLoading])
  //
  useEffect(() => {
    if (user && !userLoading && communityState.joinedCommunities.length > 0) {
      buildUserHomeFeed()
    } else {
      buildNoUserHomeFeed()
    }
  }, [user, userLoading, communityState.joinedCommunities])

  return (
    <PageContent>
      <>
        <CreatePostLink />
        {loading ? (
          <PostsLoader />
        ) : (
          <>
            {postData.posts.map(post => (
              <PostItem post={post} key={post.id} homePage />
            ))}
          </>
        )}
      </>
      <>
        <Sidebar />
      </>
    </PageContent>
  )
}
