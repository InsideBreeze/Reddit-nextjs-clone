import { create } from 'zustand'
import { Community, Post } from '../../types'

interface CommunityData {
  communityName: string
  isModerator?: boolean
  communityImage?: string
}

interface RedditState {
  currentCommunity: Community | null;
  setCurrentCommunity: (currentCommunity: Community) => void;
  posts: Post[] | undefined;
  setPosts: (posts: Post[]) => void;
  joinedCommunities: CommunityData[] | null;
  setJoinedCommunities: (communities: CommunityData[]) => void;
  homePosts: Post[];
  setHomePosts: (posts: Post[]) => void;
}

export const useRedditStore = create<RedditState>(set => ({
  currentCommunity: null,
  posts: undefined,
  joinedCommunities: null,
  homePosts: [],
  setCurrentCommunity: (community) => set(state => ({ ...state, currentCommunity: community })),
  setPosts: (posts) => set(state => ({ ...state, posts: posts })),
  setJoinedCommunities: (communities) => set(state => ({ ...state, joinedCommunities: communities })),
  setHomePosts: (posts) => set(state => ({ ...state, homePosts: posts }))
}))

