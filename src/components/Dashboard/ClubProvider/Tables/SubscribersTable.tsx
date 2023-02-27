import { useContext } from 'react';
import Table from 'react-bootstrap/Table';
import { InfoContext } from '../../../../contexts/ClubDashboard/ClubDashboardContext';
import { getSubscriberPlansFormatted } from '../../../../utils/getSubscriberPlans';
import { SUBS_PROPERTIES } from './utils/myClubProperties';

export function SubscribersTable() {

    const {
        subscribersInfo,
        plansInfo
    } = useContext(InfoContext)

    return (
        <section>
            {subscribersInfo ?
                (<>
                    {subscribersInfo.map((subscriber, index) => (
                        <tr key={index}>
                            <td>{++index}</td>
                            <td>{subscriber.name}</td>
                            <td>{subscriber.email}</td>
                            <td>{subscriber.cpf}</td>
                            <td>{plansInfo[0] ? getSubscriberPlansFormatted(subscriber.planIds as string[], plansInfo) : ""}</td>
                        </tr>
                    ))}
                </>)
                :
                <></>
            }
        </section>
    )
}