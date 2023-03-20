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

export interface Post {
  title: string
  body: string
  creatorId: string
  postImage?: string
  createdAt: Timestamp
  communityName: string
  numberOfComments: number
  voteStatus: number
  creatorName: string
}
