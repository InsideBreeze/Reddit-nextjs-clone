import { CommunityData, communityStateAtom } from '@/atoms/communityDataState'
import { userLocalAtom } from '@/atoms/userLocalState'
import { db } from '@/firebase'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  writeBatch,
} from 'firebase/firestore'
import { useAtom, useAtomValue } from 'jotai'
import React, { useEffect, useState } from 'react'
import { Community } from '../../types'
import { useRedditStore } from '@/app/store'

// this hook is used to pull data to state and some other utility functions
const useCommunityData = (communityName?: string) => {
  const [loading, setLoading] = useState(false)

  const [joinedCommunities, setJoinedCommunities] =
    React.useState<CommunityData[]>([])
  const user = useAtomValue(userLocalAtom)

  const setCurrentCommunity = useRedditStore(state => state.setCurrentCommunity)
  const currentCommunity = useRedditStore(state => state.currentCommunity)



  // for joining or leaving community
  const joinOrLeaveCommunity = (
    isJoined: boolean,
    communityData: Community
  ) => {
    if (isJoined) {
      leaveCommunity(communityData.communityName)
    } else {
      joinCommunity(communityData)
    }
  }

  const joinCommunity = async (communityData: Community) => {
    // https://firebase.google.com/docs/firestore/manage-data/transactions

    console.log('join....')

    setLoading(true)

    try {
      const batch = writeBatch(db)

      // update community by inceasing the numberOfMembers
      batch.update(doc(db, `communities/${communityData.communityName}`), {
        numberOfMembers: increment(1),
      })

      // add this community to  user's joinedCommunities
      const newCommunity = {
        communityName: communityData.communityName,
        isModerator: false,
      }
      batch.set(
        doc(
          db,
          `users/${user?.uid}/joinedCommunities/${communityData.communityName}`
        ),
        newCommunity
      )

      await batch.commit()

      // update state communityState
      setJoinedCommunities([...joinedCommunities, newCommunity])

      if (currentCommunity) {
        setCurrentCommunity({
          ...currentCommunity,
          numberOfMembers: currentCommunity?.numberOfMembers + 1
        })
      }

    } catch (error) {
      console.error('Join community error')
    }
    setLoading(false)
  }

  const leaveCommunity = async (communityName: string) => {
    // same as the join function
    console.log('leaving...')

    setLoading(true)
    try {
      const batch = writeBatch(db)
      batch.update(doc(db, `communities/${communityName}`), {
        numberOfMembers: increment(-1),
      })

      batch.delete(
        doc(db, `users/${user?.uid}/joinedCommunities/${communityName}`)
      )

      await batch.commit()
      setJoinedCommunities(joinedCommunities.filter(c => c.communityName !== communityName))

      if (currentCommunity) {
        setCurrentCommunity({
          ...currentCommunity,
          numberOfMembers: currentCommunity.numberOfMembers - 1
        })
      }

    } catch (error) {
      console.error('Leave community', error)
    }
    setLoading(false)

  }

  const getMyCommunities = async () => {
    setLoading(true)
    try {
      const communityDocs = await getDocs(
        collection(db, `users/${user?.uid}/joinedCommunities`)
      )
      const communities = communityDocs.docs.map(doc => doc.data() as CommunityData)
      setJoinedCommunities(communities)
    } catch (error: any) {
      console.log('getMyCommunities', error.message)
    }
    setLoading(false)
  }
  useEffect(() => {
    if (user) {
      getMyCommunities()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return {
    joinedCommunities,
    loading,
    joinOrLeaveCommunity,
  }
}

export default useCommunityData
