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
import React from "react";

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
          <React.Fragment key={index}>
            <CardBox 
              className={styles.plansCard} 
              cardRef={cardRef} 
              title={String(plan.club?.clubName)}
            >
              <button
                onClick={() => setIsCancelModal(true)}
                className={styles.cancelButton}
                >
                Cancelar
              </button> 
              <h5>{plan.title}</h5>
              <small><strong>Assinante desde:</strong></small>
              <p>xx/xx/xxxx</p>
              <small><strong>Próxima Entrega:</strong></small>
              <p>xx/xx/xxxx</p>
              <ProductsTableAssignature clubName={String(plan.club?.clubName)} productsInfo={plan.productsOfPlan} />
              <details>
                <summary>Descrição</summary>
                <p>{plan.description}</p>
              </details>
              <Link className="text-info" href={`/club_providers/${plan.club?.clubName}/clubArea`}>
                <button className={styles.buttonLink}>
                  Ir para Área dos Assinantes
                </button>
              </Link>
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
          </React.Fragment>
        ))}
      </Slider>  
      }
    </section>
  )
}
