import { Badge, Card, Col, Container, ProgressBar, Row } from "react-bootstrap";
import { RegisterFormClubProvider } from "../../components/RegisterForms";
import styles from "../../styles/pages/register.module.scss"

export default function RegisterSubscriber() {

  return (
    <Container className={styles.container} >
      <h1 className="text-center">Local de Registro:</h1> 
      <Card className="w-100">
        <Card.Body className="p-0">
          <Row>
            <Col>
              <div 
                className={`${styles.registerInformation} h-100 w-100 p-2 d-flex flex-column text-start`}
              >
                <ProgressBar className="my-5 w-100">
                  <ProgressBar striped variant="success" now={0} key={1} />
                  <ProgressBar variant="warning" now={0} key={2} />
                  <ProgressBar striped variant="danger" now={0} key={3} />
                </ProgressBar>
                <h3 className="text-white my-3">
                  Passo <Badge bg="primary">{1}</Badge>
                </h3>
                <p className="text-white">Insira os dados iniciais para criar seu Clube de Assinaturas</p>
              </div>
            </Col>
            <Col>
              <RegisterFormClubProvider />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  )
}