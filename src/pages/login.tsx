import { FormEvent, useState } from "react";
import axios from 'axios'

import { 
  Container, 
  Row, 
  Col, 
  Button,
  Modal,
  Form
} from 'react-bootstrap';
import { LoginFormTypes } from "../@types/FormTypes";
import { RegisterFormClubProvider, RegisterFormSubscriber } from "../components/RegisterForms";
import Link from "next/link";

export default function Login() {
  const [isRegister, setIsRegister] = useState(false)
  const [registerType, setRegisterType] = useState("")

  function handleSubscriberModal() {
    setIsRegister(!isRegister)
    setRegisterType("subscriber")

    if (registerType == "subscriber") {
      setRegisterType("")
    }
  }

  function handleClubProviderModal() {
    setIsRegister(!isRegister)
    setRegisterType("clubProvider")

    if (registerType == "clubProvider") {
      setRegisterType("")
    }
  }

  function closeModal() {
    setIsRegister(false)
  }

  // function LoginSubmit(event: FormEvent<LoginFormTypes>) {
  //   event.preventDefault()
  //   const {
  //     emailSubscriber,
  //     passwordSubscriber,
  //     emailClubProvider,
  //     passwordClubProvider
  //   } = event.currentTarget.elements

  //   console.log(event.currentTarget)

  //   if (event.currentTarget.name === "formSubscribers") {
  //     console.log("submit subscribers")
      
  //     return
  //   } else {
  //     console.log("submit clubprovider")

  //     return
  //   }
  // }

  return (
    <>
      <Container className="p-5" fluid="lg">
        <Row>
          <Col>
            <h2>Login Assinante</h2>
            <Form
              name="formSubscribers" 
              // onSubmit={(e) => LoginSubmit(e)}
            >
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control name="emailSubscriber" type="email" placeholder="Email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Senha</Form.Label>
                <Form.Control name="passwordSubscriber" type="password" placeholder="Senha" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
            
            <Link href={'/register/subscriber'}>
              <Button className="my-2">Quero Ser Assinante</Button>
            </Link>
          </Col>

          <Col>
          <h2>Login Clube</h2>
            <Form 
              name="formClubProvider" 
              // onSubmit={(e) => LoginSubmit(e)}
            >
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control name="emailClubProvider" type="email" placeholder="Email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Senha</Form.Label>
                <Form.Control name="passwordClubProvider" type="password" placeholder="Senha" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>

            <Link href={'/register/club_provider'}>
              <Button className="my-2">
                Quero Criar Um Clube
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
      
      <Modal show={isRegister} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Registrar {registerType}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {registerType == "subscriber" 
          ? 
            <RegisterFormSubscriber/>
          :
            <RegisterFormClubProvider />
          }
        </Modal.Body>
      </Modal>
    </>
  )
}