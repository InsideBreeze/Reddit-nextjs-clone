import { atom } from 'jotai'

// used to store data the logged user joined
interface communityState {
  joinedCommunities: CommunityData[]
}

export interface CommunityData {
  communityName: string
  isModerator?: boolean
}
export const communityStateAtom = atom<communityState>({
  joinedCommunities: [],
})
