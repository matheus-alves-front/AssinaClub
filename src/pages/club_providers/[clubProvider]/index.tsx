import { useRouter } from "next/router"
import { GetSessionParams } from "next-auth/react"
import { GetServerSideProps } from "next"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../api/auth/[...nextauth]"

import { getClubProviderByName } from "../../../prisma/clubProviders"

import type { ClubProvider } from "../../../@types/ClubProviderTypes"
import { Plan } from "../../../@types/PlansTypes"
import { Product } from "../../../@types/ProductTypes"
import { Subscriber } from "../../../@types/SubscriberTypes"

import { Button, Card, Col, Container, Image, Row } from "react-bootstrap"

type ClubProviderHomeProps = {
  clubProvider: ClubProvider
  clubProviderPlans: {
    data: Plan[]
  }
  clubProviderProducts: {
    data: Product[]
  }
  userProps: {
    userData: Subscriber,
    typeOfUser: string
  }
}
interface GetSubscriberData extends GetSessionParams {
  userData?: Subscriber | null
  typeOfUser?: string | null
}

export default function ClubProvidersHome({
  clubProvider,
  clubProviderPlans,
  clubProviderProducts
}: ClubProviderHomeProps) {
  const router = useRouter()
  
  function productIncludesInPlan(plansId: string[], productId: string | string[]) {
    return plansId.some(item => productId.includes(item));
  }

  function handleCheckout(
    clubAssignatureId: string, 
    planId: string | string[], 
  ) {
    router.push({
      pathname: '/checkout/clube-do-matheus',
      query: {
        clubAssignatureId,
        planId
      }
    })
  }

  return (
    <Container>
      <Row>
        <h1>{clubProvider?.clubName}</h1>
        <h5>Descrição:</h5>
        <p>{clubProvider?.description}</p>
        <h3>Planos</h3>

        {clubProviderPlans.data.map((plan, index) => (
          <Col className="mb-4" key={index} md={4}>
            <Card>
              <Image 
                src={'https://www.nerdaocubo.com.br/media/wysiwyg/img_nossos-cubos_nerd-ao-cubo.jpg'} 
                alt={'heuehu'}
                fluid
                rounded
              />
              <Card.Body>
                <Card.Title>{plan.title}</Card.Title>  
                <p>{plan.description}</p>
                <p>Entrega de {plan.deliveryFrequency} em {plan.deliveryFrequency} mês</p>
                <h6 className="mb-3">Produtos que você irá receber:</h6>
                {clubProviderProducts.data.map((product, index) => {
                  if (productIncludesInPlan(plan.productId, product.id)) {
                    return (
                      <div key={index}>
                        <p><strong>{product?.name}: </strong>
                          <span>{product.description}</span>
                        </p>
                      </div>
                    )
                  }
                })}
              </Card.Body>
              <Button 
                onClick={() => handleCheckout(plan.clubProviderId, plan.id)}
                variant="success" 
                className="m-2"
              >
                Assinar
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async(context) => {
  const clubProviderName = String(context?.params?.clubProvider)

  const clubProvider = await getClubProviderByName(clubProviderName)
  
  const fetchClubProviderPlans = await fetch(`${process.env.BASE_URL}/api/club_providers/id/${clubProvider?.id}/plans/`)
  const fetchClubProviderProducts = await fetch(`${process.env.BASE_URL}/api/club_providers/id/${clubProvider?.id}/products/`)
  
  if (!fetchClubProviderPlans.ok) {
    console.error(await fetchClubProviderPlans.text())
    throw new Error(`Failed to fetch club provider plans, status: ${fetchClubProviderPlans.status}`)
  }
  
  const clubProviderPlans = await fetchClubProviderPlans.json()

  if (!fetchClubProviderProducts.ok) {
    console.error(await fetchClubProviderPlans.text())
    throw new Error(`Failed to fetch club provider plans, status: ${fetchClubProviderPlans.status}`)
  } 

  const clubProviderProducts = await fetchClubProviderProducts.json()

  return {
    props: {
      clubProvider,
      clubProviderPlans,
      clubProviderProducts
    }
  }
}
