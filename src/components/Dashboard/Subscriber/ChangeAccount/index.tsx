import axios from "axios";
import router from "next/router";
import { FormEvent } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { DashboardType } from "../../../../pages/subscriber/dashboard";

export function ChangeAccount({subscriberData}: DashboardType) {
  const firstName = subscriberData?.name.split(" ")[0]

  async function RegisterSubscriberSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.target as HTMLFormElement;

    const {
      firstNameSubscriber,
      lastNameSubscriber,
      cpfSubscriber,
      birthDateSubscriber,
      emailSubscriber,
      passwordSubscriber,
    } = form

    if (
      !firstNameSubscriber.value || 
      !lastNameSubscriber.value || 
      !cpfSubscriber.value || 
      !birthDateSubscriber.value || 
      !emailSubscriber.value || 
      !passwordSubscriber.value
    ) {
      alert('Campos Faltando')

      return
    }

    const data = {
      "name": `${firstNameSubscriber.value} ${lastNameSubscriber.value} `,
      "cpf": cpfSubscriber.value,
      "birthDate": birthDateSubscriber.value,
      "email": emailSubscriber.value,
      "password": passwordSubscriber.value
    }
    
    try {
      await axios.put(`/api/subscribers/${subscriberData?.id}`, data)
      
      router.reload()
    }
    catch(err: any) {
      alert(err.response.data.message)
      console.log(err.response.data.message)
    }
  }


  return (
    <Card>
      <Card.Body>
        <Form 
          name="editFormSubscriber" 
          onSubmit={(e) => RegisterSubscriberSubmit(e)}
        >
          <fieldset>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control 
                    name="firstNameSubscriber" 
                    type="text" 
                    placeholder="Nome"
                    maxLength={14}
                    minLength={2} 
                    defaultValue={firstName}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Sobrenome</Form.Label>
                  <Form.Control 
                    name="lastNameSubscriber" 
                    type="text" 
                    placeholder="Sobrenome" 
                    maxLength={14}
                    minLength={2} 
                    defaultValue={subscriberData?.name.split(' ').slice(1).join(' ')}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>CPF</Form.Label>
                  <Form.Control 
                    name="cpfSubscriber" 
                    type="text" 
                    placeholder="CPF"
                    maxLength={11}
                    minLength={11}  
                    defaultValue={subscriberData?.cpf}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Data Nascimento</Form.Label>
                  <Form.Control defaultValue={subscriberData?.birthDate} name="birthDateSubscriber" type="date" placeholder="Data de Nascimento" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control defaultValue={subscriberData?.email} name="emailSubscriber" type="email" placeholder="Email" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Senha</Form.Label>
                  <Form.Control defaultValue={subscriberData?.password} name="passwordSubscriber" type="password" placeholder="Senha" />
                </Form.Group>
              </Col>
            </Row>
            <Button 
              className="float-end mt-2 px-4" 
              variant={'primary'}
              type="submit"
            >
              Salvar
            </Button>
          </fieldset>
        </Form>
      </Card.Body>
  </Card>
  )
}