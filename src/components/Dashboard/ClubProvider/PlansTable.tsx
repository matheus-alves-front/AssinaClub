import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { getPlansInfo } from '../../../utils/getPlansInfo';

export function PlansTable({ subscribersInfo, clubProviderInfo }: any) {

    const PLANS_PROPERTIES = ['nº', 'Título', 'Descrição', 'Preço', 'Frequência']

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
                        {PLANS_PROPERTIES.map((property, i) => <th key={i}>{property}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {plansInfo ?
                        (<>
                            {plansInfo.map((plan: any, index: number) => ( //! Corrigir tipagem
                                <tr key={index}>
                                    <td>{++index}</td>
                                    <td>{plan.title}</td>
                                    <td>{plan.description}</td>
                                    <td>{"R$ " + plan.price.toFixed(2)}</td>
                                    <td>{plan.deliveryFrequency}</td>
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