import { communityStateAtom } from "@/atoms/communityDataState"
import { auth, db } from "@/firebase"
import { collection, getDocs } from "firebase/firestore"
import { useAtom } from "jotai"
import { useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth"

const useMyCommunities = () => {
  const [user] = useAuthState(auth)
  const [communityState, setCommunityState] = useAtom(communityStateAtom)

  const getMyCommunities = async () => {
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
  }
  useEffect(() => {
    if (user) {
      getMyCommunities()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])
  return {
    communityState
  }
}

export default useMyCommunities
