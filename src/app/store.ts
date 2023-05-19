import { create } from 'zustand'
import { Community, Post } from '../../types'

interface RedditState {
  currentCommunity: Community | null;
  setCurrentCommunity: (currentCommunity: Community) => void;
  posts: Post[];
  setPosts: (posts: Post[]) => void
}
export const useRedditStore = create<RedditState>(set => ({
  currentCommunity: null,
  posts: [],
  setCurrentCommunity: (community) => set(state => ({ ...state, currentCommunity: community })),
  setPosts: (posts) => set(state => ({ ...state, posts: posts }))
}))
