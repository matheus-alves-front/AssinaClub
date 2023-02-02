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

import styles from '../../styles/pages/login.module.scss'
import { AuthContext } from "../../contexts/AuthContext";

export default function Login() {
  const router = useRouter()

  const {
    isAuthenticated,
    signIn,
    updateTypeOfPerson
  } = useContext(AuthContext)

  if (isAuthenticated) {
    router.push('/subscriber/clubs_board')
  }

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
      
      const { token, subscriberId } = loginPost.data.data 

      const cookie = {
        token,
        userId: subscriberId
      }

      updateTypeOfPerson('subscriber')
      await signIn(cookie)

      router.push('/subscriber/clubs_board')
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
          
          <Link href={'/register/subscriber'}>
            <Button variant="warning" className="my-2 text-white w-100">Quero Ser Assinante</Button>
          </Link>
        </Card>
      </Container>
    </>
  )
}