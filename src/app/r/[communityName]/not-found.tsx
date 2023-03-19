import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center mt-20">
      <p className="text-center">
        Sorry, that community does not exist or has been banned
      </p>
      <div className="flex justify-center mt-2">
        <Link href="/">
          <button className="w-auto px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-full">
            GO HOME
          </button>
        </Link>
      </div>
    </div>
  )
}

export default NotFound
