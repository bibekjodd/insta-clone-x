import Image from "next/image"
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { FiHeart } from 'react-icons/fi'
import { FaHeart } from 'react-icons/fa'
import { FaRegComment } from 'react-icons/fa'
import { IoMdPaperPlane } from 'react-icons/io'
import { HiOutlineBookmark } from 'react-icons/hi'
import PostComment from "./PostComment"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { db } from "../firebase"
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, setDoc, where } from "firebase/firestore"



function Post({ id, photoURL, username, caption, postPic }) {
  const [likeCount, setLikeCount] = useState(0);
  const { data } = useSession();
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  const likePost = async () => {
    const likeId = await getDocs(query(collection(db, 'posts', id, 'likes'), where('email', '==', data.user.email)))
    if (likeId.docs.length === 0) {
      await addDoc(collection(db, 'posts', id, 'likes'), {
        email: data.user.email
      });
      setHasLiked(true);
      setLikeCount(likeCount + 1)
      const snapshot = await getDocs(collection(db, 'posts', id, 'likes'));
      setLikeCount(snapshot.docs.length)
    }
    else {
      await deleteDoc(doc(db, 'posts', id, 'likes', likeId.docs[0].id));
      setHasLiked(false);
      setLikeCount(likeCount - 1)
      const snapshot = await getDocs(collection(db, 'posts', id, 'likes'));
      setLikeCount(snapshot.docs.length)
    }
  }

  useEffect(() => {
    if (!data)
      return
    onSnapshot(query(collection(db, 'posts', id, 'likes'), where('email', '==', data.user.email)), snapshot => {
      if (snapshot.docs.length === 0)
        setHasLiked(false);
      else
        setHasLiked(true)
    })
  }, [])

  useEffect(() => {
    const getLikeCount = async () => {
      const snapshot = await getDocs(collection(db, 'posts', id, 'likes'));
      setLikeCount(snapshot.docs.length)
    }
    getLikeCount();

  }, [])



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

      {data && <div className="flex px-3 py-2 text-2xl ">
        <button className="hover:scale-125 transition ease-out  mr-4 "
          onClick={likePost}>
          {!hasLiked ? <FiHeart className="hover:text-gray-600 text-gray-700" /> :
            <FaHeart className="hover:text-pink-600 text-pink-600" />}
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
      </div>}
      <p className="font-semibold text-sm px-3 mt-1">{likeCount} likes</p>
      <h5 className="px-3 pb-2 text-sm">
        <button className="font-semibold">{username}</button> {caption}
      </h5>

      <PostComment id={id} />


    </div>
  )
}

export default Post