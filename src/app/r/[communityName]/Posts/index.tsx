'use client'
import { communityStateAtom } from '@/atoms/communityDataState'
import { db } from '@/firebase'
import usePosts from '@/hooks/usePosts'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import { useAtomValue } from 'jotai'
import { useEffect, useState } from 'react'
import { Post } from '../../../../../types'
import PostItem from './PostItem'
import PostsLoader from './PostsLoader'

const Posts = () => {
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
