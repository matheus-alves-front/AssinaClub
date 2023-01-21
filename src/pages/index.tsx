import Link from "next/link";
import { 
  Container
} from 'react-bootstrap';


export default function Home() {
  return (
    <Container>
      <h1>Assina Club</h1>
      <Link href={"/login"}>Fazer Login</Link>
    </Container>
  )
}

// pega o usuário no banco getUsers() pelo lado do server, 
// export const getStaticProps: GetStaticProps<{ users: User[] }> = async() => {
//   const users = await getUsers()
//   console.log(users)
    
//   return {
//     props: {
//       users,
//     },
//     revalidate: 5
//   }
// }
