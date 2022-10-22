import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react';
import { RiAccountCircleLine } from 'react-icons/ri'
import { db } from '../firebase'
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore'

function PostComment({ id }) {
    const { data } = useSession();
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

    const postComment = async (e) => {
        e.preventDefault();
        if (comment === '')
            return;

        const commentToSend = comment;
        setComment('');
        await addDoc(collection(db, 'posts', id, 'comments'), {
            comment: commentToSend,
            username: data.user.username,
            email: data.user.email,
            timestamp: new Date().getTime(),
            profile: data.user.image
        })
    }


    useEffect(() => {
        onSnapshot(query(collection(db, 'posts', id, 'comments'), orderBy('timestamp', 'desc')), snapshot => {
            setComments(snapshot.docs.map(element => ({
                id: element.id,
                ...element.data()
            })))
        })
    }, [])

    return (
        <div className='bg-white text-sm '>
            {/* comments  */}
            <div className='px-3 '>
                {comments.length > 2 && <button className='text-gray-400 mb-1'>View all {comments.length} comments</button>}
                {comments.length > 0 && comments.slice(0, 2).map(({ comment, username, profile,id }) => (
                    <div className='flex space-x-7' key={id}>
                        <div className='mb-2 flex items-start space-x-2'>
                            <img src={profile} loading='lazy' alt=""
                                className='w-6 rounded-full' />
                            <span className='font-semibold'> {username} </span>
                        </div>
                        <span className='ml-1 line-clamp-3'> {comment}</span>
                    </div>
                ))}
               

            </div>


            {/* post comment */}
            {data && <form onSubmit={postComment}
                className='flex items-center px-3 py-1 border-t rounded-md'>
                <input type="text" name="" id="" placeholder='Add a comment' value={comment} onChange={(e) => { setComment(e.target.value) }}
                    className='placeholder:font-light placeholder:text-gray-400 p-2 flex-grow ' />
                <div onClick={() => { setComment(comment + '😂') }}
                    className=' cursor-pointer select-none px-1 hidden xs:flex'>😂</div>
                <div onClick={() => { setComment(comment + '😍') }}
                    className=' cursor-pointer select-none px-1 hidden xs:flex'>😍</div>

                <div onClick={() => { setComment(comment + '🔥') }}
                    className=' cursor-pointer select-none px-1 hidden xs:flex'>🔥</div>

                <button disabled={comment === ''}
                    className='disabled:text-sky-200 text-sky-500 font-semibold cursor-pointer ml-2' >
                    Post
                </button>

            </form>}


        </div>
    )
}

export default PostComment