import { CommunityData, communityStateAtom } from '@/atoms/communityDataState'
import { auth, db } from '@/firebase'
import { collection, getDocs, onSnapshot } from 'firebase/firestore'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

// this hook is used to provide data from state and
const useCommunityData = () => {
  const [communityState, setCommunityState] = useAtom(communityStateAtom)
  const [loading, setLoading] = useState(false)

  const [user] = useAuthState(auth)
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
  }
}

export default useCommunityData
