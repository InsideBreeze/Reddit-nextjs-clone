// this hook is mainly used to fetch posts, then store them to the state

import { postDataAtom } from '@/atoms/postData'
import { useAtom } from 'jotai'

const usePosts = () => {
  const [postDataState, setPostDataState] = useAtom(postDataAtom)

  return {
    postDataState,
    setPostDataState,
  }
}
