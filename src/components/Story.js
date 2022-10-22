import Image from "next/image"

function Story({ photoURL, username }) {
    return (
        <div className='flex flex-col w-16  group cursor-pointer'>
            <div className="rounded-full group-hover:scale-110 transition ease-in aspect-square w-fit bg-gradient-to-tr from-yellow-400 to-pink-700 p-1 grid place-items-center">
                <div className="w-10 sm:w-12 aspect-square  rounded-full overflow-hidden relative ring-2 ring-white grid place-items-center">
                    <Image src={photoURL} layout='fill' objectFit='contain'
                        className="grid place-items-center" />
                </div>
            </div>
            <h5 className="line-clamp-1 text-sm text-center ">{username}</h5>

        </div>
    )
}

export default Story