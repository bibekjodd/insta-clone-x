import React from 'react'

function PostComment() {
    return (
        <div className='bg-white text-sm '>
            {/* comments  */}
            <div className='px-3 '>
                <button className='text-gray-400 '>View all 23 comments</button>
                <p className='mb-2'>
                    <span className='font-semibold'>{'username'} </span>
                    <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, ea.</span>
                </p>
            </div>


            {/* post comment */}
            <form className='flex items-center px-3 py-1 border-t rounded-md'>
                <div className='text-xl hover:scale-125 transition cursor-pointer'>🔥</div>
                <input type="text" name="" id="" placeholder='Add a comment'
                    className='placeholder:font-light placeholder:text-gray-400 p-2 flex-grow font-semibold text-gray-700' />

                <button disabled={true}
                    className='disabled:text-sky-200 text-sky-500 font-semibold cursor-pointer' >
                    Post
                </button>

            </form>


        </div>
    )
}

export default PostComment