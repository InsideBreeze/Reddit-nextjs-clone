import Image from "next/image";
import React from "react";
import SearchInput from "./SearchInput";
import RightContent from "./RightContent";

const Navbar = () => {
  return (
    <div className="bg-white h-[49px] px-[20px] flex items-center justify-between">
      {/* logo */}
      <div className="flex items-center">
        <div className="pr-2 py-2">
          <Image
            src="/images/redditFace.svg"
            alt="reddit_logo"
            width={32}
            height={32}
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

      {/* search input */}
      <SearchInput />

      <RightContent />

      {/* Icons */}

      {/* usre menu */}
    </div>
  );
};

export default Navbar;
