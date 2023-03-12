import { GetServerSideProps } from "next";
import { FormEvent } from "react";
import Link from "next/link";
import axios from "axios";
import { getSession, signIn } from 'next-auth/react'

import styles from '../../styles/pages/login.module.scss'

export default function Login(session: any) {
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
      const loginPost = await axios.post(`/api/login`, data)
      const {token} = loginPost.data.data
      signIn('GeneralLogin', {
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
      <section className={styles.container}>
        <div className={styles.formContainer}>
          <h2>Login Assinante</h2>
          <form
            name="formSubscribers" 
            className="mb-1"
            onSubmit={(e) => LoginSubmit(e)}
          >
            <fieldset className="mb-2">
              <input name="email" type="email" placeholder="Email" />
              <small className="text-muted">
                Nunca compartilhe suas credenciais.
              </small>
              <input name="password" type="password" placeholder="Senha" />
              <button className="w-100" type="submit">
                Fazer Login
              </button>
            </fieldset>
          </form>
          <Link href={'/register/subscriber'}>
            <button className="my-2 text-white w-100">Quero Ser Assinante</button>
          </Link>
        </div>
      </section>
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