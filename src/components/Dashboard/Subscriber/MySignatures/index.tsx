import { useState } from "react";
import Link from "next/link";

import type { ClubWithPlan } from "../../../../pages/subscriber/dashboard";
import { handleAssignature } from "../../../../utils/handleAssignature";

import { ProductsTableAssignature } from "./ProductsTableAssignature";
import { Button, Card, Col, Modal, Row } from "react-bootstrap";

type MySignaturesProps = {
  AssignatureDetails?: ClubWithPlan[]
  userId?: string
}

export function MySignaturesCard({AssignatureDetails}: MySignaturesProps) {
  return (
    <Card>
      <Card.Header className="bg-transparent pt-3">
        <h6><strong>Minhas Assinaturas:</strong></h6>
      </Card.Header>
      <Card.Body>
        <Row>
        {!AssignatureDetails?.length ?
          <>
            <p>Você ainda não é assinante de nenhum clube</p>
            <Link href={'/club_providers/clubs_board'}>
              <Button variant="primary">
                Ver os Clubes
              </Button>
            </Link>
          </> 
        : 
        ''
        }
        {AssignatureDetails?.map((plan, index) => (
          <Col md={6} className="mb-3" key={index}>
            <h5>{plan.club?.clubName}</h5>
            <h6 className="mb-0">plano:</h6>
            <p>{plan.title}</p>
            <p><strong>Proxima entrega em:</strong> xx/xx/xxxx</p>
            <Link className="text-info" href={`/club_providers/${plan.club?.clubName}/clubArea`}>
              Área do Clube
            </Link>
          </Col>  
        ))}
        </Row>
      </Card.Body>
    </Card>
  )
}

export function MySignatures({AssignatureDetails, userId}: MySignaturesProps) {
  const [isCancelModal, setIsCancelModal] = useState(false) 

  function confirmCancelSignature(
    clubAssinatureId: string, 
    planId: string | string[], 
    isCancel: boolean,
    userId: string
  ) {
    handleAssignature(
      clubAssinatureId,
      planId,
      isCancel,
      userId
    )
  }

  return (
    <Row>
    {!AssignatureDetails?.length ? 
      <>
        <p>Você ainda não é assinante de nenhum clube</p>
        <Link href={'/club_providers/clubs_board'}>
          <Button variant="primary">
            Ver os Clubes
          </Button>
        </Link>
      </> 
    : 
    ''
    }
    {AssignatureDetails?.map((plan, index) => (
      <Col xxl={6} lg={12} md={6} xs={12} className="mb-3" key={index}>
        <Card>
          <Card.Header className="bg-transparent border-0 position-relative">
            <h5 className="mt-2">{plan.club?.clubName}</h5>
            <small>Assinante desde: xx/xx/xxxx</small>
            <Button  
              size="sm"
              variant="outline-danger"
              onClick={() => setIsCancelModal(true)}
              className="position-absolute end-0 top-0 m-3"
            >
              Cancelar
            </Button>
          </Card.Header>
          <Card.Body>
            <h6>{plan.title}</h6>
            <p>{plan.description}</p>
            <ProductsTableAssignature clubName={String(plan.club?.clubName)} productsInfo={plan.productsOfPlan} />
            <p><strong>Próxima Entrega:</strong></p>
            <p>...</p>
          </Card.Body>
          <Card.Body className="d-flex justify-content-between">
            <Link className="text-info" href={`/club_providers/${plan.club?.clubName}/clubArea`}>
              <Button variant="dark">
                Ir para Área dos Assinantes
              </Button>
            </Link>
          </Card.Body>
        </Card>
        <Modal show={isCancelModal} onHide={() => setIsCancelModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar Cancelamento</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Ao efetuar o cancelamento, você não irá mais receber seus produtos, assim como
              não será efetuado o extorno do seu ultimo pagamento.
            </p>
            <p>O cancelamento do Clube demora um pequeno tempo para sair de suas assinaturas.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button 
              variant="danger" 
              onClick={() => confirmCancelSignature(
                String(plan.club?.id),
                plan.id,
                true,
                String(userId)
              )}
            >
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>
      </Col>  
    ))}
    </Row>
  )
}
