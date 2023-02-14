import { GetServerSideProps } from "next"
import { GetSessionParams, getSession } from "next-auth/react"
import { prisma } from "../../../prisma/PrismaClient"

import { Subscriber } from "../../../@types/SubscriberTypes"
import { ClubProvider } from "../../../@types/ClubProviderTypes"
import { Plan } from "../../../@types/PlansTypes"

import { MyInformationsCard } from "../../../components/Dashboard/Subscriber/MyInformationsCard"
import { MySignatures, MySignaturesCard } from "../../../components/Dashboard/Subscriber/MySignatures"
import { ChangeAccount } from "../../../components/Dashboard/Subscriber/ChangeAccount"

import { Col, Container, Nav, Row, Tab } from "react-bootstrap"
import { useEffect, useState } from "react"

export interface ClubWithPlan extends Plan {
  club?: ClubProvider
}

export type DashboardType = {
  subscriberData?: Subscriber,
  signatures?: ClubProvider[]
  AssignatureDetails?: ClubWithPlan[]
}

export default function Dashboard({subscriberData, signatures, AssignatureDetails}: DashboardType) {
  const [eventKey, setEventKey] = useState('my-signatures')
  
  return (
      <Container fluid={'xl'}>
        <Tab.Container 
            id="my-account-dashboard" 
            defaultActiveKey="my-signatures"
            onSelect={(eventKey) => {
              setEventKey(String(eventKey))
            }}
        >
          <Row className="justify-content-around">
            <Col 
              xl={3}
              lg={3}
              sm={12} 
              className="border-end"
            >
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link 
                    eventKey="my-account"
                    className={eventKey === "my-account" ? 'text-white' : ''}
                  >
                    Minha Conta
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link 
                    eventKey="my-signatures"
                    className={eventKey === "my-signatures" ? 'text-white' : ''}
                  >
                    Minhas Assinaturas
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link 
                    eventKey="wish-list"
                    className={eventKey === "wish-list" ? 'text-white' : ''}
                  >
                    Lista de Desejos
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link 
                    eventKey="my-address"
                    className={eventKey === "my-address" ? 'text-white' : ''}
                  >
                    Meus Endereços
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link 
                    eventKey="my-credit-cards"
                    className={eventKey === "my-credit-cards" ? 'text-white' : ''}
                  >
                    Meus Cartões
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link 
                    eventKey="change-account"
                    className={eventKey === "change-account" ? 'text-white' : ''}
                  >
                    Alterar Conta
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col 
              sm={12} 
              lg={9}
              xl={9}
            >
              <Tab.Content>
                <Tab.Pane eventKey="my-account">
                  <h1>Minha Conta</h1>
                  <Row>
                    <Col>
                      <MyInformationsCard subscriberData={subscriberData} />
                    </Col>
                    <Col>
                      <MySignaturesCard signatures={signatures} />
                    </Col>
                  </Row> 
                </Tab.Pane>
                <Tab.Pane eventKey="my-signatures">
                  <h1>Minhas Assinaturas</h1>
                  <MySignatures userId={String(subscriberData?.id)} AssignatureDetails={AssignatureDetails} />
                </Tab.Pane>
                <Tab.Pane eventKey="wish-list">
                  <h1>Minhas Lista de Desejos</h1>
                </Tab.Pane>
                <Tab.Pane eventKey="my-address">
                  <h1>Meus Endereços</h1>
                </Tab.Pane>
                <Tab.Pane eventKey="my-credit-cards">
                  <h1>Meus Cartões</h1>
                </Tab.Pane>
                <Tab.Pane eventKey="change-account">
                  <h1>Alterar Conta</h1>
                  <ChangeAccount subscriberData={subscriberData} />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
  )
}

export interface GetSubscriberData extends GetSessionParams {
  userData?: Subscriber
  typeOfUser?: string
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const sessions = await getSession(context) as GetSubscriberData 

  if (!sessions) {
    return {
      redirect: {
        destination: '/login/subscriber',
        permanent: false
      }
    }
  }

  if (sessions?.typeOfUser !== "subscriber") {
    return {
      redirect: {
        destination: '/login/club_provider',
        permanent: false
      }
    }
  }

  const subscriberData = sessions?.userData
  
  let assinantOfClubs = await prisma.clubProvider.findMany({
    where: {
      id: {
        in: subscriberData?.clubProviderIds
      }
    }
  })

  let assinantOfPlans = await prisma.plan.findMany({
    where: {
      id: {
        in: subscriberData?.planIds
      }
    }
  })

  const AssignatureDetails = assinantOfPlans.map(plan => {
    const club = assinantOfClubs.find(club => club.id === plan.clubProviderId);
    
    return { ...plan, club };
  });

  return {
    props: {
      subscriberData,
      signatures: assinantOfClubs,
      AssignatureDetails
    }
  }
}