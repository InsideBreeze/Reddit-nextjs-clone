import Image from 'next/image'
import React from 'react'

const OAuthButtons = () => {
  return (
    <div className="flex flex-col items-center space-y-3 mb-4 mt-2">
      <p className="flex space-x-4 border rounded-full py-2 text-center w-full justify-center cursor-pointer hover:bg-gray-100">
        <Image
          src="/images/GOOG.svg"
          height="0"
          width="0"
          alt="google"
          className="w-[23px] h-[23px] object-contain"
        />
        <span>Continue with Google</span>
      </p>
      <p className="flex space-x-4 border rounded-full py-2 text-center w-full justify-center cursor-pointer hover:bg-gray-100">
        Some other providers
      </p>

      <p className="font-bold text-gray-400">OR</p>
    </div>
  )
}

export default OAuthButtons
