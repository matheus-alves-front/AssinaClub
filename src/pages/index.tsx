import Link from "next/link";
import { 
  Button,
  Container
} from 'react-bootstrap';


export default function Home() {
  return (
    <Container className="d-flex flex-column justify-content-center gap-2 text-center">
      <h1>Assina Club</h1>
      <Button variant="info" className="text-white">
        <Link href={"/login/subscriber"}>Sou Assinante</Link>
      </Button>
      <Button variant="warning" className="text-white">
        <Link href={"/login/club_provider"}>Sou Um Clube</Link>
      </Button>
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
