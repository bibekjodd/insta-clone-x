import Image from 'next/image'

function Suggesions() {
    return (
        <div className='mt-5'>
            <div className='flex justify-between items-center'>
                <h1 className='text-gray-500 font-semibold'>Suggestions For You</h1>
                <button className='text-xs font-semibold'>See All</button>
            </div>


            {/* suggestions  */}
            <div>

                <div className='flex justify-between pt-5'>
                    <div className='flex space-x-3 items-center '>
                        <div className='w-9 rounded-full relative overflow-hidden aspect-square'>
                            <Image src='/story.jpg' layout='fill' objectFit='cover'
                                className='' />
                        </div>
                        <div className='leading-4'>
                            <h3 className='font-semibold text-sm line-clamp-1'>{'username'} </h3>
                            <p className='text-gray-500 text-xs'>Suggested for you</p>
                        </div>
                    </div>
                    <button className='text-sm font-semibold text-sky-500 hover:text-sky-600'>See Profile</button>
                </div>
                <div className='flex justify-between pt-5'>
                    <div className='flex space-x-3 items-center '>
                        <div className='w-9 rounded-full relative overflow-hidden aspect-square'>
                            <Image src='/story.jpg' layout='fill' objectFit='cover'
                                className='' />
                        </div>
                        <div className='leading-4'>
                            <h3 className='font-semibold text-sm line-clamp-1'>{'username'} </h3>
                            <p className='text-gray-500 text-xs'>Suggested for you</p>
                        </div>
                    </div>
                    <button className='text-sm font-semibold text-sky-500 hover:text-sky-600'>See Profile</button>
                </div>
                <div className='flex justify-between pt-5'>
                    <div className='flex space-x-3 items-center '>
                        <div className='w-9 rounded-full relative overflow-hidden aspect-square'>
                            <Image src='/story.jpg' layout='fill' objectFit='cover'
                                className='' />
                        </div>
                        <div className='leading-4'>
                            <h3 className='font-semibold text-sm line-clamp-1'>{'username'} </h3>
                            <p className='text-gray-500 text-xs'>Suggested for you</p>
                        </div>
                    </div>
                    <button className='text-sm font-semibold text-sky-500 hover:text-sky-600'>See Profile</button>
                </div>
                <div className='flex justify-between pt-5'>
                    <div className='flex space-x-3 items-center '>
                        <div className='w-9 rounded-full relative overflow-hidden aspect-square'>
                            <Image src='/story.jpg' layout='fill' objectFit='cover'
                                className='' />
                        </div>
                        <div className='leading-4'>
                            <h3 className='font-semibold text-sm line-clamp-1'>{'username'} </h3>
                            <p className='text-gray-500 text-xs'>Suggested for you</p>
                        </div>
                    </div>
                    <button className='text-sm font-semibold text-sky-500 hover:text-sky-600'>See Profile</button>
                </div>
                <div className='flex justify-between pt-5'>
                    <div className='flex space-x-3 items-center '>
                        <div className='w-9 rounded-full relative overflow-hidden aspect-square'>
                            <Image src='/story.jpg' layout='fill' objectFit='cover'
                                className='' />
                        </div>
                        <div className='leading-4'>
                            <h3 className='font-semibold text-sm line-clamp-1'>{'username'} </h3>
                            <p className='text-gray-500 text-xs'>Suggested for you</p>
                        </div>
                    </div>
                    <button className='text-sm font-semibold text-sky-500 hover:text-sky-600'>See Profile</button>
                </div>


            </div>

        </div>
    )
}

export default Suggesions