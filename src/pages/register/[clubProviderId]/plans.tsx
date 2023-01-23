import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { Button, Col, Container, Form, ListGroup, Row } from "react-bootstrap"
import { Product } from "../../../@types/ProductTypes"
import { getProducts } from "../../../prisma/products"
import { FormEvent } from "react"
import axios from "axios"
import { useRouter } from "next/router"

export default function CreatePlans({products}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter()
  const {
    clubProviderId
  } = router.query

  function RegisterPlans(event: FormEvent<HTMLFormElement>, clubProviderId: string | string[] | undefined) {
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

    console.log(data)

    console.log(clubProviderId)
    axios.post(`/api/club_providers/id/${clubProviderId}/plans`, data).then(response => {
      form.reset()
      console.log(response)
    })
  }
  
  return(
    <Container>
      <Row>
        <Col>
          <ListGroup variant="flush">
          {products?.map((product: Product) => (
              <ListGroup.Item key={product.id} className="d-flex justify-content-between">
                {product.name}
                <Button>Adicionar ao Plano</Button>
              </ListGroup.Item>
          ))}
          </ListGroup>
        </Col>
        <Col>
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
        </Col>
      </Row>    
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async(context) => {
  const {
    clubProviderId
  } = context.params!

  const products = await getProducts(String(clubProviderId))
    
  console.log(products)

  return {
    props: {
      products,
    }
  }
}
