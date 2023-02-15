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
import { DivisionColumn } from "../../../components/Divisions/DivisionColumn"
import axios from "axios"
import { Product } from "../../../@types/ProductTypes"

export interface ClubWithPlan extends Plan {
  club?: ClubProvider
  productsOfPlan: Product[]
}

export type DashboardType = {
  subscriberData?: Subscriber,
  signatures?: ClubProvider[]
  AssignatureDetails?: ClubWithPlan[]
}

export default function Dashboard({subscriberData, signatures, AssignatureDetails}: DashboardType) {
  const [eventKey, setEventKey] = useState('my-signatures')

  // console.log(AssignatureDetails?.[0].productsOfPlan)
  
  return (
      <Container fluid={'lg'}>
        <Tab.Container 
            id="my-account-dashboard" 
            defaultActiveKey="my-signatures"
            onSelect={(eventKey) => {
              setEventKey(String(eventKey))
            }}
        >
          <Row className="justify-content-around">
            <Col 
              xxl={2}
              lg={3}
              sm={12}
            >
              <Nav variant="pills" 
                className="flex-column mt-4 mb-3"
              >
                <Nav.Item>
                  <Nav.Link 
                    eventKey="my-account"
                    className={eventKey === "my-account" ? 'text-white bg-dark' : ''}
                  >
                    Minha Conta
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link 
                    eventKey="my-signatures"
                    className={eventKey === "my-signatures" ? 'text-white  bg-dark' : ''}
                  >
                    Minhas Assinaturas
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link 
                    eventKey="wish-list"
                    className={eventKey === "wish-list" ? 'text-white  bg-dark' : ''}
                  >
                    Lista de Desejos
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link 
                    eventKey="my-address"
                    className={eventKey === "my-address" ? 'text-white  bg-dark' : ''}
                  >
                    Meus Endereços
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link 
                    eventKey="my-credit-cards"
                    className={eventKey === "my-credit-cards" ? 'text-white  bg-dark' : ''}
                  >
                    Meus Cartões
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link 
                    eventKey="change-account"
                    className={eventKey === "change-account" ? 'text-white  bg-dark' : ''}
                  >
                    Alterar Conta
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col md="auto">
              <DivisionColumn />
            </Col>
            <Col 
              sm={12} 
              lg={8}
              xxl={9}
            >
              <Tab.Content>
                <Tab.Pane eventKey="my-account">
                  <h1>Minha Conta</h1>
                  <Row>
                    <Col xxl={6} lg={12} md={6} xs={12}
                      className="mb-3"
                    >
                      <MyInformationsCard subscriberData={subscriberData} />
                    </Col>
                    <Col xxl={6} lg={12} md={6} xs={12}
                      className="mb-3"
                    >
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

  const AssignatureDetails = await Promise.all(
    assinantOfPlans.map(async (plan) => {
      const club = assinantOfClubs.find(club => club.id === plan.clubProviderId);
  
      const productsOfPlan = await axios.get(`${process.env.BASE_URL}/api/club_providers/id/${plan.clubProviderId}/products?=plansId=${plan.id}`)
  
      return { ...plan, club, productsOfPlan: productsOfPlan.data.data };
    })
  ) 

  return {
    props: {
      subscriberData,
      signatures: assinantOfClubs,
      AssignatureDetails
    }
  }
}