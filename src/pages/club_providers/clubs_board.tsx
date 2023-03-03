import { GetServerSideProps } from "next"

import { ClubProvider } from "../../@types/ClubProviderTypes"
import { getClubProviders } from "../../prisma/clubProviders"

import styles from '../../styles/pages/club_providers/clubsBoard.module.scss'
import { ClubsCard } from "../../components/UI-Components/ClubsCard"

type ClubProviderProps = {
  clubProviders: ClubProvider[]
}

export default function ClubsBoard({clubProviders}: ClubProviderProps) {
  return (
    <>
      <section className={styles.container}>
        <h1 className="mb-5 mt-0">Clubes de Assinatura</h1>
        <div className={styles.clubsBoard}>
          {clubProviders.map((club, index) => (
            <ClubsCard
              clubProvider={club}
              className={styles.clubsCard} 
            />
          ))}
        </div>
      </section>
    </>
  )
}


export const getServerSideProps: GetServerSideProps = async(context) => {
  const clubProviders = await getClubProviders()

  return {
    props: {
      clubProviders,
    }
  }
}
