import React from 'react'

const PageContent = ({ children }: { children: React.ReactNode[] }) => {
  return (
    <div className="flex justify-center pt-4">
      <div className="flex w-[95%] max-w-[860px] space-x-6">
        {/* left hand */}
        <div className="flex flex-col sm:w-full md:w-[65%]">{children[0]}</div>
        {/* right hand */}
        <div className="flex-col hidden md:flex border-[red] border flex-1">
          {children[1]}
        </div>
      </div>
    </div>
  )
}

export default PageContent
