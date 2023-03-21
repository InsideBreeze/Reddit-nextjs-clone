import React from 'react'
import { Post } from '../../../../../types'
import Image from 'next/image'
import {
  BsChat,
  BsBookmark,
  BsArrowUpCircle,
  BsArrowDownCircle,
} from 'react-icons/bs'
import { RiShareForwardLine } from 'react-icons/ri'
import { FiTrash } from 'react-icons/fi'

interface Props {
  post: Post
}
const PostItem = ({ post }: Props) => {
  return (
    <div className="flex mt-4 border border-blue-500">
      <div className="bg-gray-50 pt-2 px-3 flex flex-col items-center text-gray-700">
        <BsArrowUpCircle className="text-[16px] cursor-pointer" />
        {post.voteStatus}
        <BsArrowDownCircle className="text-[16px] cursor-pointer" />
      </div>
      <div className="p-2 bg-white flex-1">
        <div className="text-sm">
          Posted by u/{post.creatorName} 20 hors ago
        </div>
        <div className="font-semibold">{post.title}</div>
        <div className="text-sm">{post.body}</div>
        {post.postImage && (
          <Image
            src={post.postImage}
            height={460}
            width={460}
            className="max-w-[460px] max-h-[460px] p-4"
            alt=""
          />
        )}

        <div className="flex flex-start space-x-4 text-gray-700">
          <div className="postIcon">
            <BsChat className="h-4 w-4" />
            <p className="text-sm">{post.numberOfComments}</p>
          </div>
          <div className="postIcon">
            <RiShareForwardLine className="text-[20px]" />
            <p className="text-sm">Share</p>
          </div>
          <div className="postIcon">
            <BsBookmark className="text-[16px]" />
            <p className="text-sm">Save</p>
          </div>
          <div className="postIcon">
            <FiTrash className="h-4 w-4" />
            <p className="text-sm">Delete</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostItem
