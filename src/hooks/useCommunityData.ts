import { CommunityData, communityStateAtom } from '@/atoms/communityDataState'
import { auth, db } from '@/firebase'
import {
  collection,
  doc,
  getDocs,
  increment,
  writeBatch,
} from 'firebase/firestore'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Community } from '../../types'

// this hook is used to pull data to state and some other utility functions
const useCommunityData = () => {
  const [communityState, setCommunityState] = useAtom(communityStateAtom)
  const [loading, setLoading] = useState(false)

  const [user] = useAuthState(auth)

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
    setCommunityState(prev => ({
      ...prev,
      joinedCommunities: prev.joinedCommunities.concat(newCommunity),
    }))
  }

  const leaveCommunity = async (communityName: string) => {
    // same as the join function
    const batch = writeBatch(db)
    batch.update(doc(db, `communities/${communityName}`), {
      numberOfMembers: increment(-1),
    })

    batch.delete(
      doc(db, `users/${user?.uid}/joinedCommunities/${communityName}`)
    )

    await batch.commit()

    setCommunityState(prev => ({
      ...prev,
      joinedCommunities: prev.joinedCommunities.filter(
        c => c.communityName !== communityName
      ),
    }))
  }

  const getMyCommunities = async () => {
    setLoading(true)
    try {
      const communityDocs = await getDocs(
        collection(db, `users/${user?.uid}/joinedCommunities`)
      )
      const communities = communityDocs.docs.map(doc => doc.data())

      setCommunityState(prev => ({
        ...prev,
        joinedCommunities: communities as CommunityData[],
      }))
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
    communityState,
    loading,
    joinOrLeaveCommunity,
  }
}

export default useCommunityData
