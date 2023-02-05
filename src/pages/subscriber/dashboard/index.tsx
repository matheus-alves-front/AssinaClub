import { GetServerSideProps } from "next"
import { GetSessionParams, getSession, useSession } from "next-auth/react"

import { Subscriber } from "../../../@types/SubscriberTypes"
import { ClubProvider } from "../../../@types/ClubProviderTypes"

import { Col, Container, Row } from "react-bootstrap"
import { prisma } from "../../../prisma/PrismaClient"
import { MyInformationsCard } from "../../../components/Dashboard/Subscriber/MyInformationsCard"
import { MySignaturesCard } from "../../../components/Dashboard/Subscriber/MySignatures"

export type DashboardType = {
  subscriberData?: Subscriber,
  signatures?: ClubProvider[]
}

export default function Dashboard({subscriberData, signatures}: DashboardType) {
  return (
    <Container>
      <Row>
        <Col>
          <MyInformationsCard subscriberData={subscriberData} />
        </Col>
        <Col>
          <MySignaturesCard signatures={signatures} />
        </Col>
      </Row> 
    </Container>
  )
}

interface GetSubscriberData extends GetSessionParams {
  userData?: Subscriber
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const sessions = await getSession(context) as GetSubscriberData 

  const subscriberData = sessions?.userData

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