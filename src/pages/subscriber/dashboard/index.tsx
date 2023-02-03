import { Subscriber } from "../../../@types/SubscriberTypes"
import { GetServerSideProps } from "next"
import { getSubscriber } from "../../../prisma/subscribers"
import { Container, Row } from "react-bootstrap"
import { ClubProvider } from "../../../@types/ClubProviderTypes"
import { prisma } from "../../../prisma/PrismaClient"

export type DashboardType = {
  subscriberData: Subscriber,
  signatures: ClubProvider[]
}

export default function Dashboard({subscriberData, signatures}: DashboardType) {
  return (
    <Container>
      <h1>Olá {subscriberData.name}</h1>
      <Row>
        <h5>Suas informações:</h5>
        <ul>
          <li>Nascimento: {subscriberData.birthDate}</li>
          <li>Email: {subscriberData.email}</li>
          <li>CPF: {subscriberData.cpf}</li>
          <li>Assinaturas: 
          <ul>
            {signatures?.map((club, index) => (
              <li key={index}>{club.clubName}</li>
            ))}
          </ul>
          </li>
        </ul>
      </Row>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    AssinaClubUserId
  } = context.req?.cookies

  const subscriberData = await getSubscriber(String(AssinaClubUserId))

  let assinantOfClubs = JSON.stringify(await prisma.clubProvider.findMany({
    where: {
      id: {
        in: subscriberData?.clubProviderIds
      }
    }
  }))

  return {
    props: {
      subscriberData,
      signatures: JSON.parse(assinantOfClubs)
    }
  }
}