import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import { Subscriber } from "../../../../@types/SubscriberTypes"
import { DashboardType } from "../../../../pages/subscriber/dashboard"



export function MyInformationsCard({subscriberData}: DashboardType) {
  return (
    <Card>
      <Card.Header>Suas informações:</Card.Header>
      <Card.Body>
        <Form 
          name="editFormSubscriber" 
        >
          <fieldset disabled>
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
                    defaultValue={subscriberData?.name}
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
                    defaultValue={subscriberData?.name}
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
          </fieldset>
        </Form>
      </Card.Body>
  </Card>
  )
}