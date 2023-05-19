import * as React from 'react'
import { useRedditStore } from "@/app/store"
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase'

export function useCurrentCommunity(communityName: string) {
  const setCurrentCommunity = useRedditStore((state: any) => state.setCurrentCommunity)

  const currentCommunity = useRedditStore((state) => state.currentCommunity)

  const [communityNotExists, setCommunityNotExists] = React.useState(false)

  const fetchCurrentCommunity = async () => {
    if (!currentCommunity || currentCommunity.communityName !== communityName) {
      try {
        const communityDoc = await getDoc(doc(db, 'communities', communityName))
        if (!communityDoc.exists()) {
          setCommunityNotExists(true)
        } else {
          const communityData = communityDoc.data()
          setCurrentCommunity(
            JSON.parse(
              JSON.stringify({
                communityName: communityName,
                ...communityData,
                createdAt: communityData?.createdAt.toJSON(),
                communityImage: communityData?.communityImage,
              })
            ),
          )
        }
      } catch (error) {
        console.error('fetchCurrentCommunity', error)
      }
    }
  }

  React.useEffect(() => {
    fetchCurrentCommunity()
  }, [communityName])

  return {
    currentCommunity,
    communityNotExists
  }

}
