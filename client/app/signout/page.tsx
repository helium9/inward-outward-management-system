import Link from 'next/link'
 
function Home() {
  return (
    <ul>
      <li>
        <Link href="/api/auth/signout">Sign Out</Link>
      </li>
    </ul>
  )
}
 
export default Home