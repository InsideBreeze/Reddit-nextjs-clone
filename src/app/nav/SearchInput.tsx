import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
const SearchInput = () => {
  return (
    <div className="max-w-[600px] flex-1 flex items-center relative mx-2">
      <input
        placeholder="Search Reddit"
        className="w-full rounded-md border placeholder:text-[14px] p-[6px] pl-10 outline-none
        hover:border-blue-500 focus:ring-1 bg-gray-100 focus:bg-white
        "
      />
      <AiOutlineSearch className="text-[20px] absolute left-[10px] text-gray-300" />
    </div>
  );
};

export default SearchInput;
