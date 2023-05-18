'use client'
import { communityStateAtom } from '@/atoms/communityDataState'
import { userLocalAtom } from '@/atoms/userLocalState'
import { db } from '@/firebase'
import usePosts from '@/hooks/usePosts'
import { doc, getDoc } from 'firebase/firestore'
import { useAtom, useAtomValue } from 'jotai'
import { useEffect, useState } from 'react'
import { Community, Post } from '../../../../../../types'
import About from '../../About'
import PageContent from '../../PageContent'
import PostItem from '../../Posts/PostItem'
import Comments from './Comments'

const PostPage = ({
  params,
}: {
  params: {
    communityName: string
    pid: string
  }
}) => {
  const { postDataState } = usePosts()
  const { communityName, pid: postId } = params

  const [post, setPost] = useState<Post>()
  //const [user] = useAuthState(auth)
  const user = useAtomValue(userLocalAtom)

  const [communityState, setCommunityState] = useAtom(communityStateAtom)

  useEffect(() => {
    const p = postDataState.posts.find(item => item.id === postId)
    if (p) {
      setPost(p)
    } else {
      try {
        getDoc(doc(db, `posts/${postId}`)).then(docRef => {
          setPost({
            id: docRef.id,
            ...docRef.data(),
          } as Post)
        })
      } catch (error) {
        console.log('fetch Post', error)
      }
    }
  }, [postDataState.posts, postId])

  // this should run only when the fisrt time?
  useEffect(() => {
    if (communityName && !communityState.currentCommunity) {
      try {
        getDoc(doc(db, `communities/${communityName}`)).then(docRef => {
          setCommunityState(prev => ({
            ...prev,
            currentCommunity: docRef.data() as Community,
          }))
        })
      } catch (error) {
        console.log('fetch current community', error)
      }
    }
  }, [communityName, communityState.currentCommunity, setCommunityState])

  return (
    <PageContent>
      <div>
        {post && (
          <div>
            <PostItem post={post} isPostPage />
            <Comments user={user} post={post} communityName={communityName} />
          </div>
        )}
      </div>
      <>
        {communityState.currentCommunity && (
          <>
            <About community={communityState.currentCommunity} />
          </>
        )}
      </>
    </PageContent>
  )
}

export default PostPage
