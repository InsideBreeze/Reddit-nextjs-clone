import Image from 'next/image'
import { useState } from 'react'
import { BsChat, BsDot, BsReddit } from 'react-icons/bs'
import { TiArrowDownOutline, TiArrowUpOutline } from 'react-icons/ti'
import { Comment } from '../../../../../../../types'
import CommentMenu from './CommentMenu'
interface Props {
  comment: Comment
}
const CommentItem = ({ comment }: Props) => {
  const [openReply, setOpenReply] = useState(false)

  const [text, setText] = useState('')
  return (
    <div className="flex mt-2 space-x-2">
      {comment.creatorAvator ? (
        <Image src={comment.creatorAvator} width={16} height={10} alt="" />
      ) : (
        <BsReddit className="text-[30px] text-brand-100" />
      )}
      <div className="flex-1">
        <div className="flex items-center">
          <p className="cursor-pointer hover:underline">
            {comment.creatorName}
          </p>
          <BsDot className="text-[12px] text-gray-400" />
          <p className="text-xs text-gray-500">16 hr.ago</p>
        </div>
        <p className="my-2">{comment.text}</p>
        <div className="flex items-center space-x-2 text-gray-600">
          <div className="flex items-center space-x-1">
            <div className="navButton">
              <TiArrowUpOutline className="text-[20px]" />
            </div>
            <p>{0}</p>
            <div className="navButton">
              <TiArrowDownOutline className="text-[20px]" />
            </div>
          </div>
          <div
            className="flex items-center space-x-1 navButton"
            onClick={() => setOpenReply(!openReply)}
          >
            <BsChat className="text-[20px]" />
            <p className="text-sm font-[500]">Reply</p>
          </div>
          <div className="text-sm font-medium navButton">Share</div>
          <CommentMenu />
          {/* <BsThreeDots className="text-[20px" /> */}
        </div>
        {openReply && (
          <div className="flex flex-col ml-5 bg-[red] my-2">
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="What are your thoughts?"
              className="py-2 px-4 h-[120px] w-full border outline-none "
            />
            <div className="flex justify-end p-1 bg-gray-100 item-center">
              <button
                className="px-5 py-1 text-sm text-white bg-blue-500 rounded-full hover:bg-blue-600 disabled:opacity-60 disabled:text-white disabled:bg-gray-700"
                disabled={text.trim().length === 0}
              >
                Reply
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CommentItem
