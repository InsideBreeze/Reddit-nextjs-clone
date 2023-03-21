import React from 'react'
import { Post } from '../../../../../types'

interface Props {
  post: Post
}
const PostItem = ({ post }: Props) => {
  return <div>{post.title}</div>
}

export default PostItem
