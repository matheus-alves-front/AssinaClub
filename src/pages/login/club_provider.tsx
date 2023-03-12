import { getSession, GetSessionParams, signIn } from 'next-auth/react'
import { FormEvent } from "react";
import axios from 'axios'
import Link from "next/link";

import { GetServerSideProps } from "next";
import { ClubProvider } from "../../@types/ClubProviderTypes";

import styles from '../../styles/pages/login.module.scss'
export interface GetClubProviderData extends GetSessionParams {
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
      const loginPost = await axios.post(`/api/login`, data)
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
      <section className={styles.container}>
        <div className={styles.formContainer}>
          <h2 className="mb-3">Login Clube de Assinatura</h2>
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

          <Link href={'/register/club_provider'}>
            <button className="my-2 text-white w-100">Quero Criar um Clube</button>
          </Link>
        </div>
      </section>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const session = await getSession(context) as GetClubProviderData

  const clubProviderName = session?.userData?.clubName

  if (session) {
    return {
      redirect: {
        destination: `/club_providers/${clubProviderName}/dashboard`,
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