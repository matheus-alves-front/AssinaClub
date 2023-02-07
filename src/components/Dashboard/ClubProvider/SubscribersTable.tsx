import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { getPlansInfo } from '../../../utils/getPlansInfo';
import { getSubscriberPlansFormatted } from '../../../utils/getSubscriberPlans';

export function SubscribersTable({ subscribersInfo, clubProviderInfo }: any) {

    const SUBS_PROPERTIES = ['nº', 'Assinantes', 'Email', 'CPF', 'Planos']

    const [plansInfo, setPlansInfo] = useState<any[]>([]) //! Corrigir tipagem

    useEffect(() => {
        handlePlansInfo()
    }, [subscribersInfo])

    async function handlePlansInfo() {
        if (subscribersInfo) setPlansInfo(await getPlansInfo(clubProviderInfo.id))
    }

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