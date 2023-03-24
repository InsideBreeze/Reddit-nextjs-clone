import React from 'react'
import { Comment } from '../../../../../../../types'
import CommentItem from './CommentItem'
import { User } from 'firebase/auth'

interface Props {
  comments: Comment[]
  onDeleteComment: (id: string) => void
  user?: User | null
}
const CommentList = ({ comments, onDeleteComment, user }: Props) => {
  return (
    <>
      {comments.map(comment => (
        <CommentItem
          comment={comment}
          key={comment.id}
          onDeleteComment={onDeleteComment}
          user={user}
        />
      ))}
    </>
  )
}

export default CommentList
