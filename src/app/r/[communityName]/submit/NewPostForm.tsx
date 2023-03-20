import React, { useState } from 'react'

const NewPostForm = () => {
  return (
    <div className="flex flex-col p-4 space-y-3">
      <input
        name="title"
        placeholder="Title"
        className="h-10 pl-3 border rounded-md outline-none focus:ring-1"
      />
      <textarea
        name="body"
        placeholder="Text(optional)"
        className="border outline-none min-h-[80px] rounded-md pl-3 pt-2 focus:ring-1"
      />
      <div className="flex justify-end">
        <button className="px-5 py-1 font-medium text-white bg-blue-500 rounded-full hover:bg-blue-400">
          Post
        </button>
      </div>
    </div>
  )
}

export default NewPostForm
