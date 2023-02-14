import { useState } from "react";
import { Badge, Col, Container, ProgressBar, Row } from "react-bootstrap";
import styles from "../../styles/pages/register.module.scss"

import { RegisterStepsContextTypes } from "../../@types/ContextTypes";
import { RegisterStepsContext } from "../../contexts/RegisterStepsContext";

import { RegisterFormClubProvider } from "../../components/RegisterForms";
import { RegisterFormProducts } from "../../components/RegisterForms/RegisterProducts";
import RegisterFormPlans from "../../components/RegisterForms/RegisterPlans";

export default function RegisterClubProvider() {
  const [registerStepsContext, setRegisterStepsContext] = useState<RegisterStepsContextTypes>({
    steps: 1,
    data: {},
    products: [],
    plans: []
  })

  return (
    <RegisterStepsContext.Provider value={{registerStepsContext, setRegisterStepsContext}}>
      <Container className={styles.container}>
        <Row className="w-100 my-5">
          <Col className="text-center">
            <Badge bg="success" pill className="p-2 px-3 mb-3">1</Badge>
            <ProgressBar animated striped variant="success" now={registerStepsContext?.steps > 1 ? 100 : 0} key={1} />
          </Col>
          <Col className="text-center">
            <Badge bg="warning" pill className="p-2 px-3 mb-3">2</Badge>
            <ProgressBar animated striped variant="warning" now={registerStepsContext?.steps > 2 ? 100 : 0} key={2} />
          </Col>
          <Col className="text-center">
            <Badge bg="info" pill className="p-2 px-3 mb-3">3</Badge>
            <ProgressBar animated striped variant="info" now={registerStepsContext?.steps > 3 ? 100 : 0} key={3} />
          </Col>
        </Row>
        <Row className="border rounded rounded-2 w-100">
          <Col md={4} className="p-0">
            <div 
              className={`${styles.registerInformation} h-100 w-100 rounded p-3 d-flex flex-column text-start`}
            >
              <h3 className="text-white my-3">
                Passo <Badge bg="dark">{registerStepsContext.steps}</Badge>
              </h3>
              {registerStepsContext?.steps === 1 && 
                <p className="text-white">Insira os dados iniciais para criar seu Clube de Assinaturas</p>
              }
              {registerStepsContext?.steps === 2 && 
                <p className="text-white">Adicione no mínimo 3 Produtos que seu clube irá fornecer em seus planos</p>
              }
              {registerStepsContext?.steps >= 3 && 
                <p className="text-white">Crie seus planos e em seguida adicione no minimo 2 produtos aos seus planos</p>
              }
            </div>
          </Col>
          {registerStepsContext?.steps === 1 && (
          <Col>
            <RegisterFormClubProvider />
          </Col>
          )}
          {registerStepsContext?.steps === 2 && (
          <Col>
            <RegisterFormProducts />
          </Col>
          )}
          {registerStepsContext?.steps >= 3 && (
          <Col>
            <RegisterFormPlans />
          </Col>
          )}
        </Row>
      </Container>
    </RegisterStepsContext.Provider>
  )
}