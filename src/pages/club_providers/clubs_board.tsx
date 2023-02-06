import { GetServerSideProps } from "next"
import { 
  Button, 
  Card, 
  Col, 
  Container, 
  Image, 
  Row 
} from "react-bootstrap"

import { ClubProvider } from "../../@types/ClubProviderTypes"
import { getClubProviders } from "../../prisma/clubProviders"
import { getDataPrismaDateFormat } from "../../utils/getDataPrismaDateFormat"
import Link from "next/link"

type ClubProviderProps = {
  clubProviders: ClubProvider[]
}

export default function ClubsBoard({clubProviders}: ClubProviderProps) {
  return (
    <Container>
      <h1 className="mb-5 mt-0">Clubes de Assinatura:</h1>
      <Row>
        {clubProviders.map((club, index) => (
          <Col xs={6} md={4} className="mb-3" key={index}>
              <Card className="gap-2">
                <Card.Header className="p-0 border-0">
                  <Card.Title className="p-2 pb-0">{club.clubName}</Card.Title>
                  <Image 
                    src={'https://www.nerdaocubo.com.br/media/wysiwyg/img_nossos-cubos_nerd-ao-cubo.jpg'} 
                    alt={'heuehu'}
                    className="w-100 m-auto"
                    fluid
                    rounded
                  />
                </Card.Header>
                <Card.Body>
                  <Card.Subtitle>{club.description}</Card.Subtitle>
                  <Link className="btn btn-outline-primary w-100 mt-4" href={`/club_providers/${club.clubName}`}>
                    Ver os Planos
                  </Link>
                </Card.Body>
              </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}


export const getServerSideProps: GetServerSideProps = async(context) => {
  const clubProviders = getDataPrismaDateFormat(await getClubProviders())

  return {
    props: {
      clubProviders,
    }
  }
}
