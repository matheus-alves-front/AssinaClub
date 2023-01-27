import { FormEvent, useState } from "react";
import { 
  Container, 
  Row, 
  Col, 
  Button,
  Form,
  Card
} from 'react-bootstrap';
import Link from "next/link";

import styles from '../../styles/pages/login.module.scss'

export default function Login() {
  function LoginSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.target as HTMLFormElement

    const {
      email,
      password,
    } = form

    console.log(email.value, password.value)
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