import Table from 'react-bootstrap/Table';
import { getSubscriberPlansFormatted } from '../../../../utils/getSubscriberPlans';
import { SUBS_PROPERTIES } from './utils/myClubProperties';

export function SubscribersTable({ subscribersInfo, plansInfo }: any) {

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
                            {subscribersInfo.map((subscriber: any, index: number) => ( //! Corrigir tipagem
                                <tr key={index}>
                                    <td>{++index}</td>
                                    <td>{subscriber.name}</td>
                                    <td>{subscriber.email}</td>
                                    <td>{subscriber.cpf}</td>
                                    <td>{plansInfo[0] ? getSubscriberPlansFormatted(subscriber.planIds, plansInfo) : ""}</td>
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