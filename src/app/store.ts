import { create } from 'zustand'
import { Community, Post } from '../../types'
import { CommunityData } from '@/atoms/communityDataState';

interface RedditState {
  currentCommunity: Community | null;
  setCurrentCommunity: (currentCommunity: Community) => void;
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  joinedCommunities: CommunityData[] | null;
  setJoinedCommunities: (communities: CommunityData[]) => void
}

export const useRedditStore = create<RedditState>(set => ({
  currentCommunity: null,
  posts: [],
  joinedCommunities: null,
  setCurrentCommunity: (community) => set(state => ({ ...state, currentCommunity: community })),
  setPosts: (posts) => set(state => ({ ...state, posts: posts })),
  setJoinedCommunities: (communities) => set(state => ({ ...state, joinedCommunities: communities }))
}))
