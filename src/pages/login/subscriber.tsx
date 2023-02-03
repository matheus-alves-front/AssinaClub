import { FormEvent, useContext } from "react";
import { useRouter } from "next/router";
import { 
  Container,
  Button,
  Form,
  Card
} from 'react-bootstrap';
import Link from "next/link";
import axios from "axios";

import { getSession, signIn } from 'next-auth/react'

import styles from '../../styles/pages/login.module.scss'
import { GetServerSideProps } from "next";

export default function Login(session: any) {
  const router = useRouter()

  async function LoginSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const {
      email,
      password,
    } = event.target as HTMLFormElement

    const data = {
      "email": email.value,
      "password": password.value,
      "typeOfUser": "subscriber"
    }

    try {
      const loginPost = await axios.post('/api/login', data)
      const {token} = loginPost.data.data
      signIn('SubscriberLogin', {
        email: email.value,
        token, 
        typeOfUser: 'subscriber', 
      })
    }
    catch(err: any) {
      alert(String(err.response.data.message))
    }
  }

  return (
    <>
      <Container className={styles.container} fluid="lg">
        <Card className={`${styles.form} px-5 py-4 shadow-lg`}>
          <h2 className="mb-3">Login Assinante</h2>
          <Form
            name="formSubscribers" 
            className="mb-1"
            onSubmit={(e) => LoginSubmit(e)}
          >
            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control name="email" type="email" placeholder="Email" />
              <Form.Text className="text-muted">
                Nunca compartilhe suas credenciais.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Senha</Form.Label>
              <Form.Control name="password" type="password" placeholder="Senha" />
            </Form.Group>
            <Button className="w-100" variant="primary" type="submit">
              Fazer Login
            </Button>
          </Form>
          
          <Button onClick={() => signIn('github')} variant={'danger'}>Github</Button>
          <Link href={'/register/subscriber'}>
            <Button variant="warning" className="my-2 text-white w-100">Quero Ser Assinante</Button>
          </Link>
        </Card>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  if (session) {
    return {
      redirect: {
        destination: '/subscriber/dashboard',
        permanent: false
      }
    }
  }

  return {
    props: {
      session
    }
  }
}