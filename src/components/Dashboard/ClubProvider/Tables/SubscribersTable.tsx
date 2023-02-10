import Table from 'react-bootstrap/Table';
import { Plan } from '../../../../@types/PlansTypes';
import { Subscriber } from '../../../../@types/SubscriberTypes';
import { getSubscriberPlansFormatted } from '../../../../utils/getSubscriberPlans';
import { SUBS_PROPERTIES } from './utils/myClubProperties';

type SubscribersTableProps = {
    subscribersInfo: Subscriber[] | null
    plansInfo: Plan[]
}

export function SubscribersTable({ subscribersInfo, plansInfo }: SubscribersTableProps) {
    return (
        <section>
            <Table bordered hover responsive="sm" >
                <thead>
                    <tr>
                        {SUBS_PROPERTIES.map((property, i) => <th key={i}>{property}</th>)}
                    </tr>
                </thead>
                <tbody>
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
                </tbody>
            </Table>
        </section>
    )
}