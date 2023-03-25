import React from 'react'
import { GiCheckedShield } from "react-icons/gi";

const Premium = () => {
  return (
    <div className='bg-white py-2 px-3 flex flex-col rounded-md'>
      <div className='flex space-x-2'>
        <GiCheckedShield className='h-6 w-6 text-brand-100' />
        <div className='text-sm'>
          <p className='font-medium'>Reddit Premium</p>
          <p className='text-xs'>The best Reddit experience, with monthly Coins</p>
        </div>

      </div>
      <button className='bg-brand-100 text-white mt-2 rounded-full py-1 font-bold'>Try Now</button>
    </div>
  )
}

export default Premium
