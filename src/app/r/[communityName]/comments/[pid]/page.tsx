'use client'
import { userLocalAtom } from '@/atoms/userLocalState'
import { db } from '@/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { useAtomValue } from 'jotai'
import { useEffect, useState } from 'react'
import { Post } from '../../../../../../types'
import About from '../../About'
import PageContent from '../../PageContent'
import PostItem from '../../Posts/PostItem'
import Comments from './Comments'
import { useCurrentCommunity } from '@/hooks/useCurrentCommunity'
import { notFound } from 'next/navigation'
import { useCommunityPosts } from '@/hooks/useCommunityPosts'

const PostPage = ({
  params,
}: {
  params: {
    communityName: string
    pid: string
  }
}) => {

  const { communityName, pid: postId } = params
  const { currentCommunity, communityNotExists } = useCurrentCommunity(
    communityName
  )

  const { posts } = useCommunityPosts(communityName)

  const [post, setPost] = useState<Post>()
  const user = useAtomValue(userLocalAtom)

  useEffect(() => {
    if (posts) {
      const p = posts.find(item => item.id === postId)
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
    }
  }, [posts, postId])


  if (communityNotExists) {
    notFound()
  }

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
        {
          currentCommunity &&
          <About community={currentCommunity} />
        }
      </>
    </PageContent >
  )
}

export default PostPage
