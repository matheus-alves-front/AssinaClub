import { useContext } from 'react';
import { InfoContext } from '../../../../../contexts/ClubDashboard/ClubDashboardContext';
import { getSubscriberPlansFormatted } from '../../../../../utils/getSubscriberPlans';
import styles from "./styles.module.scss"

export function SubscribersList() {

    const {
        subscribersInfo,
        plansInfo
    } = useContext(InfoContext)

    return (
        <section className={styles.cardsWrapper}>
            {subscribersInfo &&
                (<>
                    {subscribersInfo.map((subscriber, index) => (
                        <div key={index} className={styles.subscriberCard}>
                            <img
                                src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'
                                alt="Subscriber image"
                                className={styles.subscriberImage}
                            />
                            <p>{subscriber.name}</p>
                            <p>{subscriber.email}</p>
                            <p>{subscriber.cpf}</p>
                            <p>{plansInfo[0] ? getSubscriberPlansFormatted(subscriber.planIds as string[], plansInfo) : ""}</p>
                        </div>
                    ))}
                </>)
            }
        </section>
    )
}