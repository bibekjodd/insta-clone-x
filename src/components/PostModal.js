import { IoCloseSharp } from 'react-icons/io5'
import { AiOutlinePicture } from 'react-icons/ai'
import { RiSendPlaneLine } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { changePostModal, selectPostModal } from '../features/userSlice';
import { useSession } from 'next-auth/react';
import { useRef, useState } from 'react';
import { db, storage } from '../firebase'
import { collection, addDoc, updateDoc, doc, getDocs } from 'firebase/firestore'
import { uploadString, getDownloadURL, ref } from 'firebase/storage'


function PostModal() {



    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const postModal = useSelector(selectPostModal);
    const { data } = useSession();
    const filePickerRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState('');
    const [caption, setCaption] = useState('');

    const addImageToPost = () => {
        const reader = new FileReader();
        if (!filePickerRef.current.files[0])
            return;
        reader.readAsDataURL(filePickerRef.current.files[0]);
        reader.onload = (readEvent) => {
            setSelectedFile(readEvent.target.result)
        }
    }

    const postPost = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (!selectedFile)
                return;

            const uploadedPost = await addDoc(collection(db, 'posts'), {
                user: {
                    username: data.user.username,
                    email: data.user.email,
                    photoURL: data.user.image,
                },
                caption,
                timestamp: new Date().getTime()
            });
            setCaption('');
            const imageRef = ref(storage, `${data.user.email}/${uploadedPost.id}`);
            await uploadString(imageRef, selectedFile, 'data_url');
            const downloadurl = await getDownloadURL(imageRef);
            await updateDoc(doc(db, 'posts', uploadedPost.id), {
                postPic: downloadurl
            })
            setSelectedFile('');
            if (postModal)
                dispatch(changePostModal());
        } catch (error) {
            console.log(error)
        }
        setLoading(false);
    }


    return (
        (postModal && data) && <div className="h-screen w-full grid place-items-center  top-0 left-0 absolute bg-black bg-opacity-50 z-50  " >

            <div className="w-80 sm:w-96 bg-white relative rounded-xl h-[500px] min-h-96  flex flex-col pb-10">
                <h1 className='text-center text-lg relative py-1.5 border-b border-gray-300'>Create new post
                    <button onClick={() => { dispatch(changePostModal()) }}
                        className='absolute top-1/2 -translate-y-1/2 right-2 p-1 text-2xl text-neutral-700 hover:text-black'>
                        <IoCloseSharp />
                    </button>
                </h1>

                <div className='flex-grow grid place-items-center'>

                    <form className='flex flex-col items-center '
                        onSubmit={postPost}>
                        {selectedFile && <img src={selectedFile} alt=""
                            className='w-full max-h-72 overflow-hidden object-contain' />}
                        {!selectedFile && <div className='text-6xl text-gray-800'>
                            <AiOutlinePicture />
                        </div>}
                        {!loading &&
                            <>
                                {selectedFile && <input type="text" name="" id="" placeholder='Caption' value={caption} onChange={(e) => { setCaption(e.target.value) }}
                                    className=' w-full px-5  mt-3 placeholder:text-gray-600' />}
                                <input ref={filePickerRef} type="file" name="" id="postImage" hidden onChange={addImageToPost} />
                                <h5 className='text-xl font-light my-2'>Drag photos and videos here</h5>
                                <label htmlFor='postImage' className='bg-sky-500 text-white px-2.5 font-semibold text-sm py-1 rounded-sm'>
                                    Select from computer
                                </label>
                            </>
                        }
                        {(selectedFile && !loading) && <button className='flex items-center bg-sky-500 text-white px-2.5 font-semibold py-1 rounded-md absolute bottom-3 right-3'>
                            <span>Send </span> <span className='ml-1 text-lg'><RiSendPlaneLine /></span>
                        </button>}
                        {loading && <p className='absolute bottom-4 left-1/2 -translate-x-1/2'>Posting...</p>}

                    </form>

                </div>

            </div>

        </div >
    )
}

export default PostModal

