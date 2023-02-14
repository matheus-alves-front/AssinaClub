import { Badge, Card, Col, Container, Row } from "react-bootstrap";
import styles from "../../styles/pages/register.module.scss"
import { RegisterFormSubscriber } from "../../components/RegisterForms";
import Link from "next/link";

export default function RegisterSubscriber() {
  return (
    <Container className={styles.containerSubscriber}>
      <Card className="w-100">
        <Row className="m-auto w-100">
          <Col md={4} className="p-0">
            <div 
              className={`${styles.registerInformation} h-100 w-100 rounded p-3 d-flex flex-column text-start`}
            >
              <h3 className="text-white my-3">
                Faça seu Cadastro!
              </h3>
              <p className="text-white">Lembre-se de conferir todos os seus dados antes de se Registrar</p>
              <span className="mt-auto text-white">
                Já tem uma conta? 
                <Link
                  className="text-info" 
                  href={'/login/subscriber'}
                > Faça Login!</Link>
              </span>
            </div>
          </Col>
          <Col>
            <RegisterFormSubscriber />
          </Col>
        </Row>
      </Card>
    </Container>
  )
}