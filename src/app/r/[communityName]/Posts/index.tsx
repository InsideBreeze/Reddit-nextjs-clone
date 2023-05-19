'use client'
import { communityStateAtom } from '@/atoms/communityDataState'
import { db } from '@/firebase'
import usePosts from '@/hooks/usePosts'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import { useAtomValue } from 'jotai'
import { useEffect, useState } from 'react'
import { Post } from '../../../../../types'
import PostItem from './PostItem'
import PostsLoader from '../../../../utils/PostsLoader'
import { useRedditStore } from '@/app/store'

const Posts = () => {
  const { postDataState, setPostDataState } = usePosts()
  const [loading, setLoading] = useState(false)
  // const { currentCommunity } = useAtomValue(communityStateAtom)

  const posts = useRedditStore(state => state.posts)
  const setPosts = useRedditStore(state => state.setPosts)

  const currentCommunity = useRedditStore(state => state.currentCommunity)
  const q = query(
    collection(db, 'posts'),
    where('communityName', '==', currentCommunity?.communityName),
    orderBy('createdAt', 'desc')
  )


  const fetchPosts = async () => {
    console.log('This will run???')
    setLoading(true)
    try {
      const postDocs = await getDocs(q)
      setPosts(postDocs.docs.map(doc => doc.data() as Post))
    } catch (error) {
      console.log('fetchPosts', error)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCommunity?.communityName])

  const handleDeletePost = (id: string) => {

  }
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
          {posts.map(post => (
            <PostItem post={post} key={post.id} />
          ))}
        </div>
      )}
    </>
  )
}

export default Posts
