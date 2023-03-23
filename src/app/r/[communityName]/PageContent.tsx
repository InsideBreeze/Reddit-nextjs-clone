import React from 'react'

const PageContent = ({ children }: { children: React.ReactNode[] }) => {
  return (
    <div className="flex justify-center pt-4">
      <div className="flex w-[95%] max-w-[860px] ">
        {/* left hand */}
        <div className="flex flex-col w-[100%] md:w-[65%]">{children[0]}</div>
        {/* right hand */}
        <div className="flex-col flex-1 hidden ml-6 rounded-lg md:flex">
          {children[1]}
        </div>
      </div>
    </div>
  )
}

export default PageContent
