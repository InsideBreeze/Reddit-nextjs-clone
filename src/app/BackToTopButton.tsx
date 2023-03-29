import React from 'react'

const BackToTopButton = () => {
  return (
    <button
      className="hidden fixed right-[220px] bottom-2 lg:flex bg-blue-500 px-4 py-1 rounded-full text-white font-medium"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: 'auto',
        })
      }
    >
      Back To Top
    </button>
  )
}

export default BackToTopButton
