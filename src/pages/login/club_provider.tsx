import { FormEvent, useState } from "react";
import axios from 'axios'

import {
  Container,
  Button,
  Form,
  Card
} from 'react-bootstrap';
import Link from "next/link";

import styles from '../../styles/pages/login.module.scss'
import { GetServerSideProps } from "next";
import { getSession, GetSessionParams, signIn } from 'next-auth/react'
import { ClubProvider } from "../../@types/ClubProviderTypes";

interface GetClubProviderData extends GetSessionParams {
  userData?: ClubProvider
}

export default function Login() {
  async function LoginSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const {
      email,
      password,
    } = event.target as HTMLFormElement

    const data = {
      "email": email.value,
      "password": password.value,
      "typeOfUser": "clubProvider"
    }

    try {
      const loginPost = await axios.post('/api/login', data)
      const { token } = loginPost.data.data
      signIn('GeneralLogin', {
        email: email.value,
        token,
        typeOfUser: 'clubProvider',
      })
    }
    catch (err: any) {
      alert(String(err.response.data.message))
    }

  }

  return (
    <>
      <Container className={styles.container} fluid="lg">
        <Card className={`${styles.form} px-5 py-4 shadow-lg`}>
          <h2 className="mb-3">Login Clube de Assinatura</h2>
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

          <Link href={'/register/club_provider'}>
            <Button variant="warning" className="my-2 text-white w-100">Quero Criar um Clube</Button>
          </Link>
        </Card>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const session = await getSession(context) as GetClubProviderData

  const clubProviderName = session?.userData?.clubName

  if (session) {
    return {
      redirect: {
        destination: `/club_providers/${clubProviderName}`,
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