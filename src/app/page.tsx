'use client'
import { communityStateAtom } from '@/atoms/communityDataState'
import { postDataAtom } from '@/atoms/postDataState'
import { auth, db } from '@/firebase'
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Post } from '../../types'
import CreatePostLink from './r/[communityName]/CreatePostLink'
import PageContent from './r/[communityName]/PageContent'
import PostItem from './r/[communityName]/Posts/PostItem'
import PostsLoader from './r/[communityName]/Posts/PostsLoader'
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

  const [communityState, setCommunityState] = useAtom(communityStateAtom)

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

  useEffect(() => {
    if (user && !userLoading && communityState.joinedCommunities.length > 0) {
      buildUserHomeFeed()
    } else {
      buildNoUserHomeFeed()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, userLoading, communityState.joinedCommunities])

  // reset community state
  useEffect(() => {
    setCommunityState(prev => ({
      ...prev,
      currentCommunity: null,
    }))
  }, [setCommunityState])

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
