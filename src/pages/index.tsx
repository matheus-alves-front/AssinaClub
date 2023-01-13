import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useEffect, useState } from 'react'
import { getUsers } from '../lib/users'

export default function Home({users}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [listUsers, setListUsers] = useState<User[]>([])
  
  useEffect(() => {
    setListUsers(users)
    console.log(users)
    console.log(typeof users)
  })

  return (
    <ol>
      {listUsers?.map((user: User) => (
        <ul key={user.id}>
          <li>{user.name}</li>
          <li>{user.email}</li>
        </ul>
      ))}
    </ol>
  )
}

type User = {
  id: number
  name: string
  email: string
}

// pega o usuário no banco getUsers() pelo lado do server, 
export const getStaticProps: GetStaticProps<{ users: User[] }> = async() => {
  const users = await getUsers()
  console.log(users)
    
  return {
    props: {
      users,
    },
    revalidate: 5
  }
}
