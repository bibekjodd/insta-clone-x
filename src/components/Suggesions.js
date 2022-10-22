import Image from 'next/image'
import { useEffect, useState } from 'react'
import { getDocs, collection, query, limit } from 'firebase/firestore'
import { db } from '../firebase'
import Link from 'next/link';

function Suggesions() {
    const [suggestions, setSuggestions] = useState([]);
    const getSuggestions = async () => {
        const snapshot = await getDocs(query(collection(db, 'users'),limit(5)));
        setSuggestions(snapshot.docs.map(suggestion => (
            {
                id: suggestion.id,
                ...suggestion.data()
            }
        )))

    }

    useEffect(() => {
        getSuggestions();
    }, [])


    return (
        <div className='mt-5'>
            <div className='flex justify-between items-center'>
                <h1 className='text-gray-500 font-semibold'>Suggestions For You</h1>
                <button className='text-xs font-semibold'>See All</button>
            </div>


            {/* suggestions  */}
            <div>
                {suggestions.map(({ name, email, id, image, username }) => (
                    <div key={id} className='flex justify-between pt-5'>
                        <Link href={`/user/${username}`}>
                            <a className='flex space-x-3 items-center '>
                                <div className='w-9 rounded-full relative overflow-hidden aspect-square'>
                                    <Image src={image} layout='fill' objectFit='cover'
                                        className='' />
                                </div>
                                <div className='leading-4'>
                                    <h3 className='font-semibold text-sm line-clamp-1'>{username.slice(1)} </h3>
                                    {/* <p className='text-gray-500 text-xs'>Suggested for you</p> */}
                                    <p className='text-gray-500 text-xs'>{name}</p>
                                </div>
                            </a>
                        </Link>
                        <Link href={`/user/${username}`}>
                            <a className='text-sm font-semibold text-sky-500 hover:text-sky-600'>See Profile</a>
                        </Link>
                    </div>

                ))}





            </div>

        </div>
    )
}

export default Suggesions