import { useRouter } from "next/router"
import { GetSessionParams } from "next-auth/react"
import { GetStaticPaths, GetStaticProps } from "next"

import { getClubProviderByName, getClubProviders } from "../../../prisma/clubProviders"

import type { ClubProvider } from "../../../@types/ClubProviderTypes"
import { Plan } from "../../../@types/PlansTypes"
import { Product } from "../../../@types/ProductTypes"
import { Subscriber } from "../../../@types/SubscriberTypes"

import { Button, Card, Col, Container, Image, Row } from "react-bootstrap"
import { LoaderSpinner } from "../../../components/Loader"
import { getPlans } from "../../../prisma/plans"
import { getProducts } from "../../../prisma/products"

type ClubProviderHomeProps = {
  clubProvider: ClubProvider
  clubProviderPlans:  Plan[]
  clubProviderProducts: Product[]
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

  if (router.isFallback) {
    return (
      <LoaderSpinner />
    )
  }
  
  function productIncludesInPlan(plansId: string[], productId: string | string[]) {
    return plansId.some(item => productId.includes(item));
  }

  function handleCheckout(
    clubAssignatureId: string, 
    planId: string | string[], 
    clubName: string
  ) {
    router.push({
      pathname: `/checkout/${clubName}`,
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

        {clubProviderPlans.map((plan, index) => (
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
                {clubProviderProducts.map((product, index) => {
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
                onClick={() => handleCheckout(plan.clubProviderId, plan.id, clubProvider?.clubName)}
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

export const getStaticProps: GetStaticProps = async(context) => {
  const clubProviderName = String(context?.params?.clubProvider)

  const clubProvider = await getClubProviderByName(clubProviderName)
  
  const clubProviderPlans = await getPlans(String(clubProvider?.id))

  const clubProviderProducts = await getProducts(String(clubProvider?.id))

  return {
    props: {
      clubProvider,
      clubProviderPlans,
      clubProviderProducts
    }
  }
}

export const getStaticPaths: GetStaticPaths = async (context) => {
  const clubProvider = await getClubProviders()
 
  const paths = clubProvider?.map(club => {
    return {
      params: {
        clubProvider: `${club.clubName}`
      }
    }
  })
 
  return {
    paths: paths,
    fallback: true
  }
}

