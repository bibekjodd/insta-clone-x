import '../styles/globals.css'
import LoadingBar from 'react-top-loading-bar'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Header from '../components/Header';
import { SessionProvider } from 'next-auth/react';
import ProfileModal from '../components/ProfileModal';
import { store } from '../app/store'
import { Provider } from 'react-redux'

function MyApp({ Component, pageProps }) {
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {

    router.events.on('routeChangeComplete', () => {
      setProgress(100);
    })

    router.events.on('routeChangeStart', () => {
      setProgress(27);
    })


  }, [])


  return (
    <Provider store={store}>
      <SessionProvider>
        <LoadingBar
          progress={progress}
          // color='rgb(245 158 0)'
          // color='rgb(192 38 211)'
          color='rgb(219 39 119)'
          waitingTime={200}
          onLoaderFinished={() => { setProgress(0) }}
        />
        {/* <ProfileModal /> */}
        <Header />
        <Component {...pageProps} />
      </SessionProvider>
    </Provider>

  )
}

export default MyApp
