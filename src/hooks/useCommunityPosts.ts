import * as React from 'react'
import { useRedditStore } from "@/app/store"
import { db } from "@/firebase"
import { collection, getDocs, orderBy, query, where } from "firebase/firestore"
import { Post } from '../../types'

export function useCommunityPosts(communityName: string) {
  const posts = useRedditStore(state => state.posts)
  const setPosts = useRedditStore(state => state.setPosts)

  const [loading, setLoading] = React.useState(false)
  const currentCommunity = useRedditStore(state => state.currentCommunity)
  const q = query(
    collection(db, 'posts'),
    where('communityName', '==', communityName),
    orderBy('createdAt', 'desc')
  )


  const fetchPosts = async () => {
    setLoading(true)
    try {
      const postDocs = await getDocs(q)
      setPosts(postDocs.docs.map(doc => doc.data() as Post))
    } catch (error) {
      console.log('fetchPosts', error)
    }
    setLoading(false)
  }

  React.useEffect(() => {
    fetchPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCommunity?.communityName])

  return {
    loading,
    posts
  }
}
