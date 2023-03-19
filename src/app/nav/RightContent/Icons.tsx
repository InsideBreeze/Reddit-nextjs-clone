import { AiOutlineMessage, AiOutlinePlus } from 'react-icons/ai'
import { BsArrowUpRightCircle, BsCameraVideo } from 'react-icons/bs'
import { HiOutlineBell } from 'react-icons/hi'
import { IoFilterCircleOutline } from 'react-icons/io5'

const Icons = () => {
  return (
    <div className="flex items-center justify-between space-x-2 text-gray-600">
      <div className="items-center hidden pr-2 space-x-2 border-gray-300 border-r-[2px] md:flex">
        <div className="navButton">
          <BsArrowUpRightCircle className="text-[22px]" />
        </div>
        <div className="navButton">
          <IoFilterCircleOutline className="text-[23px]" />
        </div>
        <div className="navButton">
          <BsCameraVideo className="text-[23px]" />
        </div>
      </div>
      <div className="navButton">
        <AiOutlineMessage className="text-[23px]" />
      </div>

      <div className="navButton">
        <HiOutlineBell className="text-[23px]" />
      </div>
      <div className="navButton">
        <AiOutlinePlus className="text-[23px] hidden md:flex" />
      </div>
    </div>
  )
}

export default Icons
