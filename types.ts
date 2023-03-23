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
  id: string
  title: string
  body: string
  creatorId: string
  postImage?: string
  createdAt: Timestamp
  communityName: string
  numberOfComments: number
  numberOfVotes: number
  creatorName: string
}

export interface Comment {
  id: string
  text: string
  createdAt: Timestamp
  creatorId: string
  creatorAvator: string
}
