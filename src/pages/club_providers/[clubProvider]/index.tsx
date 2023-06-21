import { useRouter } from "next/router"
import { GetSessionParams } from "next-auth/react"
import { GetStaticPaths, GetStaticProps } from "next"

import { getClubProviderByName, getClubProviders } from "../../../prisma/clubProviders"

import type { ClubProvider } from "../../../@types/ClubProviderTypes"
import { Plan } from "../../../@types/PlansTypes"
import { Product } from "../../../@types/ProductTypes"
import { Subscriber } from "../../../@types/SubscriberTypes"

import { LoaderSpinner } from "../../../components/Loader"
import { getPlans } from "../../../prisma/plans"
import { getProducts } from "../../../prisma/products"

import styles from '../../../styles/pages/club_providers/clubProviderPage.module.scss'

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
    clubName: string,
    planName: string
  ) {
    router.push({
      pathname: `/checkout/${clubName}/payment`,
      query: {
        clubAssignatureId,
        planId,
        planName
      }
    })
  }

  return (
    <section className={styles.Container}>
      <div className={styles.Header}>
        <img 
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5P9pyvWR6UAMZJ6Zd8JRyEXM-KvDCCGZyUQ&usqp=CAU" 
          alt={'heuehu'}
        />
        <h1>{clubProvider?.clubName}</h1>
        <h2>Descrição:</h2>
        <p>{clubProvider?.description}</p>
      </div>
      <h3>Planos</h3>
      <div className={styles.Content}>
        {clubProviderPlans.map((plan, index) => (
          <article key={index} className={styles.Card}>
            <h4>{plan.title}</h4>  
            <div>
              <p>{plan.description}</p>
              <p>Entrega de {plan.deliveryFrequency} em {plan.deliveryFrequency} meses</p>
              <h5 className="mb-3">Produtos que você irá receber:</h5>
              {clubProviderProducts.map((product, index) => {
                if (productIncludesInPlan(plan.productId, product.id)) {
                  return (
                    <div key={index}>
                      <p>
                        <strong>{product?.name}:</strong>
                        <br />
                        <span>{product.description}</span>
                      </p>
                    </div>
                  )
                }
              })}
            </div>
            <button 
              onClick={() => handleCheckout(plan.clubProviderId, plan.id, clubProvider?.clubName, plan.title)}
              className="m-2"
              >
              Assinar
            </button>
          </article>
        ))}
      </div>
    </section>
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

