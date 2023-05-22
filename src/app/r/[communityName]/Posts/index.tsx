'use client'
import { Post } from '../../../../../types'
import PostItem from './PostItem'
import PostsLoader from '../../../../utils/PostsLoader'

interface Props {
  posts: Post[];
  loading: boolean
}
const Posts = ({ posts, loading }: Props) => {
  return (
    <>
      {loading ? (
        <PostsLoader />
      ) : (
        <div className="">
          {posts.map(post => (
            <PostItem post={post} key={post.id} />
          ))}
        </div>
      )}
    </>
  )
}

export default Posts
