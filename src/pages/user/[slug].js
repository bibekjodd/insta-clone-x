import Head from 'next/head';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { HiOutlineViewGrid } from 'react-icons/hi'

function slug() {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const router = useRouter();
    const { data } = useSession();

    const getUserData = async () => {
        if (!data)
            return;
        const snapshot = await getDoc(doc(db, 'users', router.query.slug));
        setUser(snapshot.data())
    }

    const getPosts = async () => {
        const snapshot = await getDocs(query(collection(db, 'posts'), where('username', '==', router.query.slug)));
        setPosts(snapshot.docs.map(post => ({
            ...post.data(),
            id: post.id
        })))
    }



    useEffect(() => {
        if (!router.isReady)
            return;

        getUserData();
        getPosts();
    }, [router.isReady, data])

    return (
        <>
            <div className='flex flex-col items-center mt-5 sm:mt-7'>
                <Head>
                    <title>users | {router.query.slug}</title>
                </Head>
                <div className='flex items-center space-x-5 sm:space-x-10'>
                    <img src={user?.image} alt="profile image" loading='lazy'
                        className='w-20 xs:w-24 sm:w-32 rounded-full object-cover aspect-square' />
                    <div>
                        <h1 className='text-neutral-600 text-xl sm:text-2xl'>
                            {user?.username?.slice(1)}
                        </h1>
                        <h1 className='font-semibold text-lg'>
                            {user?.name}
                        </h1>
                        <h1>
                            {posts.length} posts
                        </h1>
                    </div>
                </div>
                {posts.length !== 0 ? <h1 className='text-center mx-auto mt-10 mb-3 font-semibold text-gray-700 flex items-center space-x-2'>
                    <span>All Posts </span>  <button className='mt-0.5'><HiOutlineViewGrid /></button>
                </h1> :
                    <h1 className='text-center mx-auto mb-3 font-semibold text-gray-700 flex items-center space-x-2 mt-10'>There isn't any post to show on this profile </h1>}
                <div className=' w-full max-w-[900px] grid grid-cols-3 p-nice bg-gray-50 mb-10'>
                    {posts.map(post => (
                        <div key={post.id} className=' w-full aspect-square grid place-items-center p-3 bg-white cursor-pointer' >
                            <div className='relative w-full aspect-square grid place-items-center'>
                                <Image src={post.postPic} layout='fill' objectFit='cover' />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>

    )
}

export default slug