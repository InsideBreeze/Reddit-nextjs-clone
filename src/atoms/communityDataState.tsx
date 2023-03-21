import { atom } from 'jotai'
import { Community } from '../../types'

// used to store data the logged user joined
interface communityState {
  joinedCommunities: CommunityData[]
  currentCommunity?: Community | null
}

export interface CommunityData {
  communityName: string
  isModerator?: boolean
}
export const communityStateAtom = atom<communityState>({
  joinedCommunities: [],
})
