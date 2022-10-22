import { getProviders, signIn } from 'next-auth/react'
import Head from 'next/head'
import { FcGoogle } from 'react-icons/fc'

function signin({ providers }) {
    return (
        <div className='w-full  grid place-items-center mt-40 sm:mt-60'>
            <Head>
                <title>Sign In</title>
            </Head>
            <div className='flex flex-col space-y-3'>
                {Object.values(providers).map(provider => (
                    <button key={provider.name}
                        className='bg-sky-500 text-white flex items-center rounded-sm overflow-hidden'>
                        <div onClick={() => { signIn(provider.id, { callbackUrl: '/' }) }}
                            className='px-3 text-lg'>Sign In with {provider.name}</div>
                        <div className='bg-white p-3 text-2xl'>
                            {provider.name === 'Google' ? <FcGoogle /> : ''}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default signin

export async function getServerSideProps(context) {
    const providers = await getProviders();
    return {
        props: {
            providers
        }
    }
}

