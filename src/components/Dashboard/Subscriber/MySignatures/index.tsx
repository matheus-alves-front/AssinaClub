import { RefObject, useEffect, useRef, useState } from "react";
import Link from "next/link";

import type { ClubWithPlan } from "../../../../pages/subscriber/dashboard";
import { handleAssignature } from "../../../../utils/handleAssignature";

import { ProductsTableAssignature } from "./ProductsTableAssignature";
import { Button, Card, Col, Modal, Row } from "react-bootstrap";
import { CardBox } from "../../../UI-Components/CardBox";

import styles from './mySignatures.module.scss';
import Slider from "../../../UI-Components/Slider";
import observeRefsWidth from "../../../UI-Components/Slider/utils/observeRefsWidth";

type MySignaturesProps = {
  AssignatureDetails?: ClubWithPlan[]
  userId?: string
}

export function MySignaturesCard({AssignatureDetails}: MySignaturesProps) {
  return (
    <CardBox title="Minhas Assinaturas:">
      <div className={styles.mySignaturesCard}>
        {!AssignatureDetails?.length ?
          <div className={styles.withoutSignatures}>
            <p>Você ainda não é assinante de nenhum clube</p>
            <Link href={'/club_providers/clubs_board'}>
              <button>
                Ver os Clubes
              </button>
            </Link>
          </div> 
        : 
        ''
        }
        {AssignatureDetails?.map((plan, index) => (
          <div className={styles.signatures}>
            <h5>{plan.club?.clubName}</h5>
            <h6 className="mb-0">Assinatura:</h6>
            <p>{plan.title}</p>
            <h6><strong>Proxima entrega em:</strong></h6>
            <p>xx/xx/xxxx</p>
            <Link className="text-info" href={`/club_providers/${plan.club?.clubName}/clubArea`}>
              Ir para Área do Clube
            </Link>
          </div>  
        ))}
      </div>
    </CardBox>
  )
}

export function MySignaturesDetails({AssignatureDetails, userId}: MySignaturesProps) {
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

  const cardRef = useRef() as RefObject<HTMLDivElement>
  const [cardRefWidth, setCardRefWidth] = useState(0)

  useEffect(() => {
    observeRefsWidth(cardRef, setCardRefWidth)
  })

  return (
    <section className={styles.mySignatureDetails}>
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
        <Slider 
          cardRefWidth={cardRefWidth}
          infoList={AssignatureDetails ? AssignatureDetails : []}
          sliderClassName={styles.sliderCards}
        >
        {AssignatureDetails?.map((plan, index) => (
          <div className={styles.card} key={index}>
            <CardBox cardRef={cardRef} title={String(plan.club?.clubName)}>
              <div className="bg-transparent border-0 position-relative">
                <h5 className="mt-2">{plan.club?.clubName}</h5>
                <small>Assinante desde: xx/xx/xxxx</small>
                <button
                  onClick={() => setIsCancelModal(true)}
                  className="position-absolute end-0 top-0 m-3"
                >
                  Cancelar
                </button>
              </div>
              <div>
                <h6>{plan.title}</h6>
                <p>{plan.description}</p>
                <ProductsTableAssignature clubName={String(plan.club?.clubName)} productsInfo={plan.productsOfPlan} />
                <p><strong>Próxima Entrega:</strong></p>
                <p>...</p>
              </div>
              <footer className="d-flex justify-content-between">
                <Link className="text-info" href={`/club_providers/${plan.club?.clubName}/clubArea`}>
                  <Button variant="dark">
                    Ir para Área dos Assinantes
                  </Button>
                </Link>
              </footer>
            </CardBox>
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
          </div>
        ))}
      </Slider>  
      }
    </section>
  )
}
