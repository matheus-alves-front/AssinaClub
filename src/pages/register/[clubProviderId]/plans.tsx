import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { Button, Col, Container, Form, ListGroup, Row } from "react-bootstrap"
import { Product } from "../../../@types/ProductTypes"
import { getProducts } from "../../../prisma/products"

export default function CreatePlans({products}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return(
    <Container>
      <Row>
        <Col>
          <ListGroup variant="flush">
          {products?.map((product: Product) => (
              <ListGroup.Item className="d-flex justify-content-between">
                {product.name}
                <Button>Adicionar ao Plano</Button>
              </ListGroup.Item>
          ))}
          </ListGroup>
        </Col>
        <Col>
          <Form>
            <Form.Text>
              <h1>
                Plano
              </h1>
            </Form.Text>
            <Form.Group>
              <Form.Label>Nome do Plano</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Descrição</Form.Label>
              <Form.Control as="textarea" />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Preço</Form.Label>
                  <Form.Control type="number" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Frequencia</Form.Label>
                  <Form.Control type="number" />
                  <Form.Text className="text-muted">
                    De 2 em 2 meses
                  </Form.Text>
                </Form.Group>
              </Col>
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
