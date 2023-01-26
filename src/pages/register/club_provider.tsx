import { useEffect, useState } from "react";
import { Badge, Button, Card, Col, Container, ProgressBar, Row } from "react-bootstrap";
import styles from "../../styles/pages/register.module.scss"

import { RegisterStepsContextTypes } from "../../@types/ContextTypes";
import { RegisterStepsContext } from "../../contexts/RegisterStepsContext";

import { RegisterFormClubProvider } from "../../components/RegisterForms";
import { RegisterFormProducts } from "../../components/RegisterForms/RegisterProducts";
import RegisterFormPlans from "../../components/RegisterForms/RegisterPlans";

export default function RegisterSubscriber() {
  const [registerStepsContext, setRegisterStepsContext] = useState<RegisterStepsContextTypes>({
    steps: 1,
    data: {},
    products: [],
    plans: []
  })

  useEffect(() => {
    console.log(registerStepsContext)
  }, [registerStepsContext])

  return (
    <RegisterStepsContext.Provider value={{registerStepsContext, setRegisterStepsContext}}>
      <Container className={styles.container}>
        <Row className="border rounded rounded-2">
          <Col md={4} className="p-0">
            <div 
              className={`${styles.registerInformation} h-100 w-100 rounded p-3 d-flex flex-column text-start`}
            >
              <h3 className="text-white my-3">
                Passo <Badge bg="primary">{registerStepsContext.steps}</Badge>
              </h3>
              {registerStepsContext?.steps === 1 && 
                <p className="text-white">Insira os dados iniciais para criar seu Clube de Assinaturas</p>
              }
              {registerStepsContext?.steps === 2 && 
                <p className="text-white">Adicione no mínimo 3 Produtos que seu clube irá fornecer em seus planos</p>
              }
              {registerStepsContext?.steps >= 3 && 
                <p className="text-white">Crie seus planos e em seguida adicione os produtos aos seus planos</p>
              }
              <ProgressBar className="mb-3 mt-auto w-100">
                <ProgressBar striped variant="success" now={registerStepsContext?.steps > 1 ? 33 : 0} key={1} />
                <ProgressBar variant="warning" now={registerStepsContext?.steps > 2 ? 33 : 0} key={2} />
                <ProgressBar striped variant="info" now={registerStepsContext?.steps > 3 ? 34 : 0} key={3} />
              </ProgressBar>
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