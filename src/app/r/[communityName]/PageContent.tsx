import React from 'react'

const PageContent = ({ children }: { children: React.ReactNode[] }) => {
  return (
    <div className="flex justify-center pt-4">
      <div className="flex w-[95%] max-w-[860px] ">
        {/* left hand */}
        <div className="flex flex-col w-[100%] md:w-[65%]">{children[0]}</div>
        {/* right hand */}
        <div className="ml-6 flex-col hidden md:flex flex-1 rounded-lg">
          {children[1]}
        </div>
      </div>
    </div>
  )
}

export default PageContent
