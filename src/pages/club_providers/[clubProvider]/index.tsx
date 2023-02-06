import { GetServerSideProps } from "next"
import { getClubProviderByName } from "../../../prisma/clubProviders"
import { getDataObjectPrismaDateFormat } from "../../../utils/getDataPrismaDateFormat"
import { ClubProvider } from "../../../@types/ClubProviderTypes"
import { Card, Col, Container, Image, Row } from "react-bootstrap"
import { Plan } from "../../../@types/PlansTypes"
import { Product } from "../../../@types/ProductTypes"

type ClubProviderHomeProps = {
  clubProvider: ClubProvider
  clubProviderPlans: {
    data: Plan[]
  }
  clubProviderProducts: {
    data: Product[]
  }
}

export default function ClubProvidersHome({
  clubProvider,
  clubProviderPlans,
  clubProviderProducts
}: ClubProviderHomeProps) {

  function productIncludesInPlan(plansId: string[], productId: string | string[]) {
    return plansId.some(item => productId.includes(item));
  }

  return (
    <Container>
      <Row>
        <h1>{clubProvider?.clubName}</h1>
        <h5>Descrição:</h5>
        <p>{clubProvider?.description}</p>
        <h3>Planos</h3>

        {clubProviderPlans.data.map((plan, index) => (
          <Col key={index} md={4}>
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
                <Row className="products">
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}


export const getServerSideProps: GetServerSideProps = async(context) => {
  const { host } = context.req.headers
  const clubProviderName = String(context?.params?.clubProvider)

  const clubProvider = getDataObjectPrismaDateFormat(await getClubProviderByName(clubProviderName))
  
  const fetchClubProviderPlans = await fetch(`http://${host}/api/club_providers/id/${clubProvider?.id}/plans/`)
  const fetchClubProviderProducts = await fetch(`http://${host}/api/club_providers/id/${clubProvider?.id}/products/`)
  
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
