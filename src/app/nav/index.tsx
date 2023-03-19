import Image from 'next/image'
import React from 'react'
import SearchInput from './SearchInput'
import RightContent from './RightContent'
import Directory from './Directory'

const Navbar = () => {
  return (
    <div className="bg-white h-[49px] px-3 md:px-[20px] flex items-center justify-between">
      {/* logo */}
      {/* you can set w and h by css from next13 */}
      <div className="flex items-center">
        <div className="py-2 pr-2">
          <Image
            src="/images/redditFace.svg"
            alt="reddit_logo"
            width="0"
            height="0"
            className="w-7 h-7 xl:w-8"
          />
        </div>

        <Image
          className="mr-[20px] hidden md:flex"
          src="/images/Reddit_Logotype_OnWhite.svg"
          width={57}
          height={18}
          alt=""
        />
      </div>

      {/* directory */}
      <Directory />

      {/* search input */}
      <SearchInput />

      <RightContent />

      {/* Icons */}

      {/* usre menu */}
    </div>
  )
}

export default Navbar
