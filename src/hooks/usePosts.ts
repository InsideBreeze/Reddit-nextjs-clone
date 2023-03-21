// this hook is mainly used to fetch posts, then store them to the state

import { postDataAtom } from '@/atoms/postDataState'
import { useAtom } from 'jotai'

const usePosts = () => {
  const [postDataState, setPostDataState] = useAtom(postDataAtom)

  const onVote = () => {}

  const deletePost = () => {}

  return {
    postDataState,
    setPostDataState,
  }
}

export default usePosts
