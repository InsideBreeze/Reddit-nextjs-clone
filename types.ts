import { Timestamp } from 'firebase/firestore'

export interface Community {
  communityName: string
  createdAt: Timestamp
  communityImage?: string
  numberOfMembers: number
  creatorId: string
  privacyType: 'public' | 'restricted' | 'private'
}

interface User {}
