import { Card, Col, Row } from "react-bootstrap";
import { DashboardType } from "../../../../pages/subscriber/dashboard";
import Link from "next/link";

export function MySignaturesCard({signatures}: DashboardType) {
  return (
    <Card>
      <Card.Header>Minhas Assinaturas:</Card.Header>
      <Card.Body>
        <Row>
        {signatures?.map((club, index) => (
          <Col md={6} className="mb-3" key={index}>
            <h5>{club.clubName}</h5>
            <small>{club.subscriberIds?.length} inscritos</small>
            <h6 className="mb-0">descrição:</h6>
            <p>{club.description}</p>
            <Link className="text-info" href={`/club_providers/${club.clubName}`}>Ver o Clube</Link>
          </Col>  
        ))}
        </Row>
      </Card.Body>
    </Card>
  )
}

export function MySignatures({AssignatureDetails}: DashboardType) {
  return (
    <Row>
    {AssignatureDetails?.map((plan, index) => (
      <Col md={6} className="mb-3" key={index}>
        <header>
          <h5>{plan.club?.clubName}</h5>
          <small>{plan.club?.subscriberIds?.length} inscritos</small>
          <h6 className="mb-0">descrição:</h6>
          <p>{plan.club?.description}</p>
        </header>
        <h6>{plan.title}</h6>
        <p>{plan.description}</p>
        <p><strong>Produtos inclusos:</strong></p>
        {/* <p>{plan.productId ? (console.log()) : ''}</p> */}
        <Link className="text-info" href={`/club_providers/${plan.club?.clubName}`}>Ver o Clube</Link>
      </Col>  
    ))}
    </Row>
  )
}