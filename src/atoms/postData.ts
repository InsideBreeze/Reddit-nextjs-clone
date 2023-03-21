import { atom } from 'jotai'
import { Post } from '../../types'

interface PostState {
  posts: Post[]
  selectedPost: Post | null
}

export const postDataAtom = atom<PostState>({
  posts: [],
  selectedPost: null,
})
