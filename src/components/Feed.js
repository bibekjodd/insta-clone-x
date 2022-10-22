import React, { useEffect, useState } from 'react'
import Post from './Post'
import { db } from '../firebase'
import { onSnapshot, collection, query, orderBy } from 'firebase/firestore'

function Feed() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), snapshot => {
      setPosts(snapshot.docs.map(post => (
        {
          id: post.id,
          ...post.data()
        }
      )));
    });

  }, [])

  return (
    <div className='w-full flex flex-col space-y-5 mt-5 mb-10'>
      {posts.map(({ id, caption, postPic, timestamp, user: { email, photoURL, username } }) => (
        <Post key={id}
          id={id}
          caption={caption}
          postPic={postPic}
          username={username}
          photoURL={photoURL}
          timestamp={timestamp}
          email={email}
        />
      ))}

    </div>
  )
}

export default Feed

