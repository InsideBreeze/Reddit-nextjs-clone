import React from 'react'
import { Comment } from '../../../../../../../types'
import CommentItem from './CommentItem'

interface Props {
  comments: Comment[]
}
const CommentList = ({ comments }: Props) => {
  return (
    <>
      {comments.map(comment => (
        <CommentItem comment={comment} key={comment.id} />
      ))}
    </>
  )
}

export default CommentList
