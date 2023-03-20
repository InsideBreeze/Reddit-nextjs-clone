import React, { useRef } from 'react'

const UploadImage = () => {
  const fileRef = useRef<HTMLInputElement>(null)
  return (
    <div className="flex items-center justify-center p-4 h-[208px]">
      <div className="flex items-center justify-center w-full h-full border border-dotted ">
        <button
          className="px-4 py-1 font-medium text-blue-500 bg-white border border-blue-500 rounded-full"
          onClick={() => fileRef.current?.click()}
        >
          Upload
        </button>
        <input
          type="file"
          className="hidden"
          ref={fileRef}
          accept=".jpg,.jpeg,.png,.gif"
        />
      </div>
    </div>
  )
}

export default UploadImage
