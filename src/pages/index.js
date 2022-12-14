import { useSession } from "next-auth/react"
import Head from "next/head"
import Feed from "../components/Feed"
import Miniprofile from "../components/Miniprofile"
import Stories from "../components/Stories"
import Suggesions from "../components/Suggesions"

function index() {
  const { data } = useSession();
  return (
    <main className="w-full flex  justify-center items-start  space-x-10">
      <Head>
        <title>Instagram</title>
      </Head>

      {/* stories and feed */}
      <section className="w-full  max-w-[470px]">
        <Stories />
        <Feed />
      </section>


      {/* mini profile and suggestions */}
      {data &&
        <section className="w-80 hidden lg:flex flex-col sticky top-20  left-0">
          <Miniprofile />
          <Suggesions />
        </section>
      }

    </main>
  )
}

export default index