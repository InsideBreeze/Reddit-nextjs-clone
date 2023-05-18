'use client'
import { communityStateAtom } from '@/atoms/communityDataState'
import { postDataAtom } from '@/atoms/postDataState'
import { userLocalAtom } from '@/atoms/userLocalState'
import { db } from '@/firebase'
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import { useAtom, useAtomValue } from 'jotai'
import { useEffect, useState } from 'react'
import { Post } from '../../types'
import PostsLoader from '../utils/PostsLoader'
import CreatePostLink from './r/[communityName]/CreatePostLink'
import PageContent from './r/[communityName]/PageContent'
import PostItem from './r/[communityName]/Posts/PostItem'
import Sidebar from './sidebar'

let counter = 0

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [postData, setPostData] = useAtom(postDataAtom)

  const [communityState, setCommunityState] = useAtom(communityStateAtom)
  const userValue = useAtomValue(userLocalAtom)

  console.log('render count: ', counter++)
  console.log('user', userValue)
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

  // reset community state
  useEffect(() => {
    setCommunityState(prev => ({
      ...prev,
      currentCommunity: null,
    }))
  }, [setCommunityState])

  useEffect(() => {
    if (userValue && communityState.joinedCommunities.length > 0) {
      buildUserHomeFeed()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userValue, communityState.joinedCommunities])

  useEffect(() => {
    if (!userValue || communityState.joinedCommunities.length === 0) {
      buildNoUserHomeFeed()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userValue, communityState.joinedCommunities])

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
