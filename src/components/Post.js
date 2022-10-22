import Image from "next/image"
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { FiHeart } from 'react-icons/fi'
import { FaHeart } from 'react-icons/fa'
import { FaRegComment } from 'react-icons/fa'
import { IoMdPaperPlane } from 'react-icons/io'
import { HiOutlineBookmark } from 'react-icons/hi'
import PostComment from "./PostComment"



function Post({ photoURL, username, caption, postPic }) {
  return (
    <div className="bg-white rounded-md border border-gray-300 overflow-hidden">

      {/* top */}
      <div className="p-2 flex justify-between items-center">
        <div className="flex items-center space-x-1.5">
          <div className="rounded-full  aspect-square w-fit bg-gradient-to-tr from-yellow-300 to-pink-600 p-1 grid place-items-center">
            <div className="w-7 sm:w-9 aspect-square  rounded-full overflow-hidden relative ring-2 ring-white grid place-items-center">
              <Image src={photoURL} layout='fill' objectFit='contain'
                className="grid place-items-center" />
            </div>
          </div>
          <button className="font-semibold text-sm">{username}</button>
        </div>
        <button>
          <BiDotsHorizontalRounded className="text-2xl text-gray-700 hover:scale-125 transition hover:text-gray-600" />
        </button>

      </div>

      {/* middle pic  */}
      <img src={postPic} alt=""
        className="w-full" />

      <div className="flex px-3 py-2 text-2xl text-gray-700">
        <button className="hover:scale-125 transition ease-out  hover:text-gray-600 mr-4 ">
          <FiHeart />
        </button>
        <button className="hover:scale-125 transition ease-out hover:text-gray-600 mr-4 ">
          <FaRegComment />
        </button>
        <button className="hover:scale-125 transition ease-out hover:text-gray-600 mr-4 ">
          <IoMdPaperPlane />
        </button>
        <button className="hover:scale-125 transition ease-out hover:text-gray-600 ml-auto">
          <HiOutlineBookmark />
        </button>
      </div>
      <p className="font-semibold text-sm px-3">72 likes</p>
      <h5 className="px-3 pb-2 text-sm">
        <button className="font-semibold">{username}</button> {caption}
      </h5>

      <PostComment />


    </div>
  )
}

export default Post