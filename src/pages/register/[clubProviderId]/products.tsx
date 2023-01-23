import { useRouter } from "next/router"
import { Badge, Button, Card, Col, Container, ProgressBar, Row } from "react-bootstrap"
import styles from "../../../styles/pages/register.module.scss"
import { RegisterFormProducts } from "../../../components/RegisterForms/RegisterProducts"
import Link from "next/link"

export default function RegisterProducts() {
  const router = useRouter()
  const {clubProviderId} = router.query

  return (
    <Container className="p-5" >
      <h1 className="text-center mb-5">Local de Registro:</h1> 
      <Card className="w-100">
        <Card.Body className="p-0">
          <Row>
            <Col>
              <div 
                className={`${styles.registerInformation} h-100 w-100 p-3 d-flex flex-column text-start`}
              >
                <ProgressBar className="my-5 w-100">
                  <ProgressBar striped variant="success" now={33} key={1} />
                  <ProgressBar variant="warning" now={0} key={2} />
                  <ProgressBar striped variant="danger" now={0} key={3} />
                </ProgressBar>
                <h3 className="text-white my-3">
                  Passo <Badge bg="primary">{2}</Badge>
                </h3>
                <p className="text-white">Crie Seus Produtos</p>
              </div>
            </Col>
            <Col md={8} className="p-2 py-4">
              <RegisterFormProducts />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  )
}