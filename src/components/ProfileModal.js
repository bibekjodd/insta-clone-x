import { RiAccountCircleLine } from 'react-icons/ri'
import { BsArrowRepeat } from 'react-icons/bs'
import { GrClose } from 'react-icons/gr'
import { signOut, useSession } from 'next-auth/react'
import { useSelector, useDispatch } from 'react-redux'
import { changeUserModal, selectUserModal } from '../features/userSlice'
import { useRouter } from 'next/router'

function ProfileModal() {
    const { data } = useSession();
    const modalState = useSelector(selectUserModal)
    const dispatch = useDispatch();

    const router = useRouter();

    return (
        (data && modalState) && (
            <div className='border shadow-md bg-white   w-64 absolute space-y-1 py-1  top-0 sm:top-12 right-0 z-20 rounded-md overflow-hidden'>
                <div className='relative'>
                    <button onClick={() => { dispatch(changeUserModal()) }}
                        className='absolute p-2 top-1 right-1 text-gray-700 hover:text-black'>
                        <GrClose />
                    </button>
                    <button onClick={() => {dispatch(changeUserModal()); router.push(`/user/${data.user.username}`)}}
                        className='flex space-x-2 items-center p-2  hover:bg-stone-50 w-full'>
                        <div className='text-xl text-gray-700'>
                            <RiAccountCircleLine />
                        </div>
                        <p>Profile</p>
                    </button>
                    <button onClick={signOut}
                        className='flex space-x-2 items-center p-2  hover:bg-stone-50 w-full'>
                        <div className='text-xl text-gray-700'>
                            <BsArrowRepeat />
                        </div>
                        <p>Switch accounts</p>
                    </button>
                    <button onClick={signOut}
                        className='p-1.5 px-5 font-medium border-t-2 border-t-gray-200 hover:bg-stone-50 w-full text-left'>Log Out</button>
                </div>

            </div>)
    )
}

export default ProfileModal