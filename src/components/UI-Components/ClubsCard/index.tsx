import Link from "next/link";
import { ClubProvider } from "../../../@types/ClubProviderTypes";
import { formatDateToDefault } from "../../../utils/getFormattedDate";

import styles from './clubsCard.module.scss';

type ClubsCardProps = {
  clubProvider: ClubProvider
  className?: string
}

export function ClubsCard({
  clubProvider,
  className
}: ClubsCardProps) {
  const creationDate = formatDateToDefault(clubProvider.creationDate)

  return (
    <div className={`${className} ${styles.card}`}>
      <header>
        <img 
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5P9pyvWR6UAMZJ6Zd8JRyEXM-KvDCCGZyUQ&usqp=CAU" 
          alt={`Banner ${clubProvider.clubName}`}
          className={styles.banner} 
        />
        <figure className={styles.logo}>
          <img 
            src="https://www.nerdaocubo.com.br/media/wysiwyg/img_nossos-cubos_nerd-ao-cubo.jpg" 
            alt={`Logo ${clubProvider.clubName}`}
          />
        </figure>
      </header>
      <div className={styles.cardContent}>
        <h5>{clubProvider.clubName}</h5>
        <small>Criado desde: {creationDate}</small>
        <p className={styles.subscriptions}>
          <span>{clubProvider.subscriberIds?.length}</span>
          <small>Inscritos</small>
        </p>
        <p className={styles.description}>{clubProvider.description}</p>
        <Link href={`/club_providers/${clubProvider.clubName}`}>
          Ver os Planos
        </Link>
      </div>
    </div>
  )
}