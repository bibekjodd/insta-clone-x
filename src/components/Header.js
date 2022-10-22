import Link from 'next/link'
import { RiSearchLine } from 'react-icons/ri'
import { AiFillCloseCircle } from 'react-icons/ai'
import { AiFillHome } from 'react-icons/ai'
import { AiOutlineHome } from 'react-icons/ai'
import { RiMessengerLine } from 'react-icons/ri'
import { RiMessengerFill } from 'react-icons/ri'
import { FiPlusSquare } from 'react-icons/fi'
import { FaPlusSquare } from 'react-icons/fa'
import { MdOutlineExplore } from 'react-icons/md'
import { MdExplore } from 'react-icons/md'
import { FaHeart } from 'react-icons/fa'
import { FaRegHeart } from 'react-icons/fa'
import { GrInstagram } from 'react-icons/gr'
import { useRouter } from 'next/router'
import { useSession, signIn } from 'next-auth/react'
import { useDispatch, useSelector } from 'react-redux'
import { changePostModal, changeUserModal, selectPostModal } from '../features/userSlice'
import ProfileModal from './ProfileModal'


function Header() {
    const router = useRouter();
    const {
        data } = useSession();
    const dispatch = useDispatch();
    const postModal = useSelector(selectPostModal);

    return (
        <>
            <div className='w-full select-none bg-white py-2 md:py-2.5 border-b border-b-gray-200 sm:mb-5  sticky z-10 top-0 left-0'>

                <header className='lg:max-w-screen-lg mx-auto p-nice flex relative justify-between  top-full right-0'>

                    {/* left  */}
                    <ProfileModal />
                    <Link href='/'>
                        <a className='hidden xs:flex items-center'>
                            <img src="/instagram.png" alt="img" width='105' height='30'
                                className='hidden sm:block' />
                            <GrInstagram className='sm:hidden text-2xl sm:text-3xl' />
                        </a>
                    </Link>


                    {/* center  */}
                    <div className='flex bg-stone-200 py-1.5 bg-opacity-40 rounded-md items-center px-2  flex-grow  flex-shrink mx-2 xs:mx-7 xs:flex-grow-0  space-x-2 group xs:w-60'>
                        <label htmlFor="main-search"
                            className='group-focus-within:hidden'>
                            <RiSearchLine
                                className='cursor-text text-gray-500' />
                        </label>
                        <input type="text" name="" id="main-search" placeholder='Search'
                            className='flex-grow bg-transparent outline-none placeholder:font-light' />
                        <div className='hidden group-focus-within:block'>
                            <AiFillCloseCircle
                                className='text-neutral-400 cursor-pointer' />
                        </div>
                    </div>


                    {/* right */}
                    {data && <div className='flex space-x-6 sm:space-x-4 md:space-x-5 items-center text-2xl md:text-[27px] text-gray-800 '>
                        <Link href='/' className=''>
                            <a className='hidden sm:block'>
                                {router.pathname === '/' ?
                                    <AiFillHome className='' />
                                    :
                                    <AiOutlineHome className='' />
                                }

                            </a>
                        </Link>
                        <button className='hidden xs:block' onClick={() => { dispatch(changePostModal()) }}>
                            {!postModal ? < FiPlusSquare className='text-2xl ' /> :
                                <FaPlusSquare className='text-2xl text-gray-700' />}
                        </button>
                        <Link href='/inbox' className=''>
                            <a>

                                {router.pathname === '/inbox' ?
                                    <RiMessengerFill className='' />
                                    :
                                    <RiMessengerLine className='' />
                                }
                            </a>
                        </Link>

                        <Link href='/explore' className=''>
                            <a className='hidden sm:block'>
                                {router.pathname === '/explore' ?
                                    <MdExplore />
                                    :
                                    <MdOutlineExplore className='' />
                                }
                            </a>
                        </Link>
                        <button className='hidden sm:block'>
                            <FaRegHeart className='text-xl md:text-2xl' />
                        </button>
                        <button
                            className='hidden sm:block text-base font-semibold'>

                            <img src={data?.user?.image} loading='lazy' alt="img" onClick={() => { dispatch(changeUserModal()) }}
                                className='w-[30px] rounded-full aspect-square object-cover' />
                        </button>
                    </div>}
                    {!data && <button onClick={signIn} className='font-semibold text-base'>
                        Sign In
                    </button>}
                </header>
            </div>

            {/* bottom  */}


            {data && <header className='flex sm:hidden justify-around  fixed w-full left-0 bottom-0 items-center text-3xl bg-white z-10 py-2 text-gray-800 '>
                <Link href='/' className=''>
                    <a className=''>
                        {router.pathname === '/' ?
                            <AiFillHome className='' />
                            :
                            <AiOutlineHome className='' />
                        }

                    </a>
                </Link>
                <button onClick={() => { dispatch(changePostModal()) }}
                    className='xs:hidden '>
                    {!postModal ? <FiPlusSquare className='text-2xl' /> :
                        <FaPlusSquare className='text-2xl text-gray-700' />}
                </button>


                <Link href='/explore' className=''>
                    <a className=''>
                        {router.pathname === '/explore' ?
                            <MdExplore />
                            :
                            <MdOutlineExplore className='' />
                        }
                    </a>
                </Link>
                <button className=''>
                    <FaRegHeart className='text-2xl' />
                </button>
                <button className='text-base font-semibold'>
                    {!data ? <span onClick={signIn}>Sign In</span> :
                        <img src={data?.user?.image} loading='lazy' alt="img" onClick={() => { dispatch(changeUserModal()) }}
                            className='w-[30px] rounded-full aspect-square object-cover' />
                    }
                </button>
            </header>}

        </>


    )
}

export default Header