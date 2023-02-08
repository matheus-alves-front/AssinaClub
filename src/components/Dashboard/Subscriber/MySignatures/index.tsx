import { Button, Card, Col, Modal, Row } from "react-bootstrap";
import { ClubWithPlan, DashboardType } from "../../../../pages/subscriber/dashboard";
import Link from "next/link";
import { handleAssignature } from "../../../../utils/handleAssignature";
import { useState } from "react";

export function MySignaturesCard({signatures}: DashboardType) {
  return (
    <Card>
      <Card.Header><strong>Minhas Assinaturas:</strong></Card.Header>
      <Card.Body>
        <Row>
        {!signatures?.length ?
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
        {signatures?.map((club, index) => (
          <Col md={6} className="mb-3" key={index}>
            <h5>{club.clubName}</h5>
            <h6 className="mb-0">descrição:</h6>
            <p>{club.description}</p>
            <Link className="text-info" href={`/club_providers/${club.clubName}/clubArea`}>
              Área do Clube
            </Link>
          </Col>  
        ))}
        </Row>
      </Card.Body>
    </Card>
  )
}

type MySignaturesProps = {
  AssignatureDetails?: ClubWithPlan[]
  userId: string
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
      <Col md={6} className="mb-3" key={index}>
        <Card>
          <Card.Header>
            <strong>{plan.club?.clubName}</strong>
          </Card.Header>
          <Card.Body>
            <h6>{plan.title}</h6>
            <p>{plan.description}</p>
            <p><strong>Produtos inclusos:</strong></p>
            <p>...</p>
            <p><strong>Próxima Entrega:</strong></p>
            <p>...</p>
          </Card.Body>
          <Card.Body className="d-flex justify-content-between">
            <Link className="text-info" href={`/club_providers/${plan.club?.clubName}/clubArea`}>
              <Button variant="primary">
                Ir para Área dos Assinantes
              </Button>
            </Link>
            <Button  
              variant="outline-danger"
              onClick={() => setIsCancelModal(true)}
            >
              Cancelar assinatura
            </Button>
          </Card.Body>
        </Card>
        <Modal show={isCancelModal} onHide={() => setIsCancelModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar Cancelamento</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Ao efetuar o cancelamento, você não irá mais receber seus produtos, assim como
            não será efetuado o extorno do seu ultimo pagamento.
          </Modal.Body>
          <Modal.Footer>
            <Button 
              variant="danger" 
              onClick={() => confirmCancelSignature(
                String(plan.club?.id),
                plan.id,
                true,
                userId
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