import { Card, Col, ListGroup, Row } from "react-bootstrap";
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