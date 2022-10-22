import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'

function Miniprofile() {
    const { data } = useSession();
    return (
        <div className='flex justify-between pt-5'>
            <div className='flex space-x-3 items-center '>
                <div className='w-14 rounded-full relative overflow-hidden aspect-square'>
                    <Image src={data.user.image} layout='fill' objectFit='cover'
                        className='' />
                </div>
                <div className='leading-5'>
                    <h3 className='font-semibold text-sm line-clamp-1'>{'username'} </h3>
                    <p className='text-gray-500'>Welcome to Instagram</p>
                </div>
            </div>
            <button onClick={signOut}
                className='text-sm font-semibold text-sky-500 hover:text-sky-600'>Logout</button>
        </div>
    )
}

export default Miniprofile