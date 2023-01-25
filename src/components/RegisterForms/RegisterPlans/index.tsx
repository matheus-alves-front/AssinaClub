import { Button, Col, Form, Row } from "react-bootstrap"
import { FormEvent, useContext } from "react"
import axios from "axios"
import { RegisterStepsContext } from "../../../contexts/RegisterStepsContext"

export default function RegisterFormPlans() {
 const { 
    registerStepsContext,
    setRegisterStepsContext
  }: any = useContext(RegisterStepsContext)

  const clubProviderId = registerStepsContext?.data.id 

  async function RegisterPlans(event: FormEvent<HTMLFormElement>, clubProviderId: string | string[] | undefined) {
    event.preventDefault()

    const form = event.target as HTMLFormElement;

    const {
      PlanTitle,
      PlanDescription,
      PlanPrice,
      PlanFrequency
    } = form

    const data = {
      "title": PlanTitle.value,
      "description": PlanDescription.value,
      "price": Number(PlanPrice.value),
      "deliveryFrequency": Number(PlanFrequency.value)
    }

    const postPlans = await axios.post(`/api/club_providers/id/${clubProviderId}/plans`, data)

    const plan = postPlans.data.data

    setRegisterStepsContext({
      ...registerStepsContext,
      plans: [...registerStepsContext.plans, plan]
    })
  }
  
  return(
    <Form onSubmit={(e) => RegisterPlans(e, clubProviderId)}>
      <Form.Text>
        <h1>
          Plano
        </h1>
      </Form.Text>
      <Form.Group>
        <Form.Label>Nome do Plano</Form.Label>
        <Form.Control name="PlanTitle" type="text" />
      </Form.Group>
      <Form.Group>
        <Form.Label>Descrição</Form.Label>
        <Form.Control name="PlanDescription" as="textarea" />
      </Form.Group>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>Preço</Form.Label>
            <Form.Control name="PlanPrice" type="number" />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Frequencia</Form.Label>
            <Form.Control name="PlanFrequency" type="number" />
            <Form.Text className="text-muted">
              De 2 em 2 meses
            </Form.Text>
          </Form.Group>
        </Col>
        <Button type="submit">Criar Plano</Button>
      </Row>
    </Form>
  )
}