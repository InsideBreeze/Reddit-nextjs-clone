import Spinner from '@/utils/Spinner'
import React from 'react'

interface Props {
  fieldValues: {
    title: string
    body: string
  }
  onTextChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  createPost: () => void
  loading: boolean
}

const TextInputs = ({
  onTextChange,
  createPost,
  loading,
  fieldValues,
}: Props) => {
  return (
    <div className="flex flex-col p-4 space-y-3">
      <input
        value={fieldValues.title}
        name="title"
        placeholder="Title"
        className="h-10 pl-3 border rounded-md outline-none focus:ring-1"
        onChange={onTextChange}
      />
      <textarea
        value={fieldValues.body}
        name="body"
        placeholder="Text(optional)"
        className="border outline-none min-h-[80px] rounded-md pl-3 pt-2 focus:ring-1"
        onChange={onTextChange}
      />
      <div className="flex justify-end">
        {loading ? (
          <Spinner />
        ) : (
          <button
            className="px-5 py-1 font-medium text-white bg-blue-500 rounded-full hover:bg-blue-400"
            onClick={createPost}
          >
            Post
          </button>
        )}
      </div>
    </div>
  )
}

export default TextInputs
