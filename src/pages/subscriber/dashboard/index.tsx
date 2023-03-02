import { useEffect, useState } from "react"
import { GetServerSideProps } from "next"
import { GetSessionParams, getSession } from "next-auth/react"
import { prisma } from "../../../prisma/PrismaClient"
import axios from "axios"

import { Subscriber } from "../../../@types/SubscriberTypes"
import { ClubProvider } from "../../../@types/ClubProviderTypes"
import { Plan } from "../../../@types/PlansTypes"
import { Product } from "../../../@types/ProductTypes"

import { MyInformationsCard } from "../../../components/Dashboard/Subscriber/MyInformationsCard"
import { MySignaturesDetails, MySignaturesCard } from "../../../components/Dashboard/Subscriber/MySignatures"
import { ChangeAccount } from "../../../components/Dashboard/Subscriber/ChangeAccount"
import { DivisionColumn } from "../../../components/Divisions/DivisionColumn"

import { IoChevronDownOutline } from 'react-icons/io5'
import styles from '../../../styles/pages/subscriber/dashboard.module.scss'

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
  const [sectionName, setSectionName] = useState("Minhas Assinaturas")

  const [isDropdownMobile, setIsDropdownMobile] = useState(false)

  useEffect(() => {
    switch (eventKey) {
      case "my-account":
        setSectionName("Minha Conta");
        break;
      case "my-signatures":
        setSectionName("Minhas Assinaturas");
        break;
      case "wish-list":
        setSectionName("Lista de Desejos");
        break;
      case "my-address":
        setSectionName("Meus Endereços");
        break;
      case "my-credit-cards":
        setSectionName("Meus Cartões");
        break;
      case "change-account":
        setSectionName("Alterar Conta");
        break;
      default:
        setSectionName("Minhas Assinaturas");
        break;
    }

    setIsDropdownMobile(false)
  }, [eventKey])

  return (
      <section className={styles.container}>
        <aside 
          id="my-account-dashboard"
          className={styles.dashboardNavigation} 
        >
          <button 
            className={`${styles.sectionNameMobile} ${isDropdownMobile ? styles.sectionNameMobileActive : ''}`}
            onClick={() => setIsDropdownMobile(!isDropdownMobile)}
          >
            {sectionName}
            <IoChevronDownOutline />
          </button>
          <nav className={isDropdownMobile ? styles.active : ''}>
              <button 
                className={eventKey === "my-account" ? styles.active : ''}
                onClick={() => setEventKey("my-account")}
              >
                Minha Conta
              </button>
            
              <button 
                className={eventKey === "my-signatures" ? styles.active : ''}
                onClick={() => setEventKey("my-signatures")}
              >
                Minhas Assinaturas
              </button>
            
              <button 
                className={eventKey === "wish-list" ? styles.active : ''}
                onClick={() => setEventKey("wish-list")}
              >
                Lista de Desejos
              </button>
            
              <button 
                className={eventKey === "my-address" ? styles.active : ''}
                onClick={() => setEventKey("my-address")}
              >
                Meus Endereços
              </button>
            
              <button 
                className={eventKey === "my-credit-cards" ? styles.active : ''}
                onClick={() => setEventKey("my-credit-cards")}
              >
                Meus Cartões
              </button>
            
              <button 
                className={eventKey === "change-account" ? styles.active : ''}
                onClick={() => setEventKey("change-account")}
              >
                Alterar Conta
              </button>
          </nav>
        </aside>
    
        <DivisionColumn />
        <section className={styles.dashboardContent}>
          <h1 className={styles.sectionName}>{sectionName}</h1>
          {eventKey === "my-account" && (
            <>
              <div className={styles.col}>
                <MyInformationsCard subscriberData={subscriberData} />
              </div>
              <div className={styles.col}>
                <MySignaturesCard AssignatureDetails={AssignatureDetails} />
              </div>
            </>
          )}
          {eventKey === "my-signatures" &&  
            <MySignaturesDetails userId={String(subscriberData?.id)} AssignatureDetails={AssignatureDetails} />
          }

          {eventKey === "wish-list" &&  ''}

          {eventKey === "my-address" &&  ''}

          {eventKey === "my-credit-cards" &&  ''}

          {eventKey === "change-account" &&  
            <ChangeAccount subscriberData={subscriberData} />
          }
        </section>
      </section>
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