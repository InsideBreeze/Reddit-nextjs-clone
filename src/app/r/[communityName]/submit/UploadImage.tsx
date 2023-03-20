import Image from 'next/image'
import React, { useRef } from 'react'

interface Props {
  selectedFile: string
  onSelectFile: (e: React.ChangeEvent<HTMLInputElement>) => void
  clearSelectedFile: () => void
  backToPost: () => void
}
const UploadImage = ({
  onSelectFile,
  selectedFile,
  clearSelectedFile,
  backToPost,
}: Props) => {
  const fileRef = useRef<HTMLInputElement>(null)
  return (
    <div className="flex items-center justify-center p-4">
      {selectedFile ? (
        <div className="flex flex-col items-center space-y-3">
          <Image
            src={selectedFile}
            className="w-auto h-auto max-w-[400px] max-h-[400px]"
            width="0"
            height="0"
            alt=""
          />
          <div className="flex space-x-2">
            <button
              className="px-4 py-1 text-sm text-white bg-blue-500 rounded-full"
              onClick={backToPost}
            >
              Back to Post
            </button>
            <button
              className="px-4 py-1 text-sm font-medium text-blue-500 bg-white border border-blue-500 rounded-full"
              onClick={clearSelectedFile}
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-[176px] border border-dotted ">
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
            onChange={onSelectFile}
          />
        </div>
      )}
    </div>
  )
}

export default UploadImage
