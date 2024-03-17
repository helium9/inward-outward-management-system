import { options } from "../api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next"
// import UserCard from "./components/UserCard"

export default async function Home() {
    const session = await getServerSession(options)
  
    return (
      <>
        {session ? (
            console.log(session?.user)
        //   <UserCard user={session?.user} pagetype={"Home"} />
        ) : console.log("not signed in")}
      </>
    )
  }