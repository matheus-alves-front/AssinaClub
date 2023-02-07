import Table from 'react-bootstrap/Table';
import { PLANS_PROPERTIES } from './utils/myClubProperties';

export function PlansTable({ plansInfo }: any) {

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