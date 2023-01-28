import { GetServerSideProps } from "next"
import { Button, Card, CardGroup, Col, Container, Row } from "react-bootstrap"

import { ClubProvider } from "../../@types/ClubProviderTypes"
import { getClubProviders } from "../../prisma/clubProviders"
import { getDataPrismaDateFormat } from "../../utils/getDataPrismaDateFormat"

type ClubProviderProps = {
  clubProviders: ClubProvider[]
}

export default function ClubsBoard({clubProviders}: ClubProviderProps) {
console.log(clubProviders)
  return (
    <Container>
      <Row>
        {clubProviders.map((club) => (
          <Col>
              <Card className="gap-2">
                <Card.Header>
                  <Card.Title>{club.clubName}</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Card.Subtitle>{club.description}</Card.Subtitle>
                </Card.Body>
                <Button className="m-2" variant="outline-primary">Ver os Planos</Button>
              </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}


export const getServerSideProps: GetServerSideProps = async() => {
  const clubProviders = getDataPrismaDateFormat(await getClubProviders())

  return {
    props: {
      clubProviders,
    }
  }
}
