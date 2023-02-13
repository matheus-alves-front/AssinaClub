import { useContext } from 'react';
import Table from 'react-bootstrap/Table';
import { InfoContext } from '../../../../contexts/ClubDashboard/ClubDashboardContext';
import { PRODUCTS_PROPERTIES } from './utils/myClubProperties';

export function ProductsTable() {

    const {
        plansInfo,
        productsInfo
    } = useContext(InfoContext)

    function displayPlansNames(plansIds: string[]) {
        const plansNames: string[] = []

        if(!plansIds) return ""

        plansIds.forEach(planId => {
            const plan = plansInfo.filter(plan => planId === plan.id)[0]
            plansNames.push(plan?.title)
        })
        return plansNames.join(', ')
    }

    return (
        <section>
            <Table bordered hover responsive="sm" >
                <thead>
                    <tr>
                        {PRODUCTS_PROPERTIES.map((property, i) => <th key={i}>{property}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {productsInfo ?
                        (<>
                            {productsInfo.map((product, index) => (
                                <tr key={index}>
                                    <td>{++index}</td>
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>{"R$ " + product.value.toFixed(2)}</td>
                                    <td>{product.sku}</td>
                                    {/* <td>{product.additionalOptions?.[0] ? product.additionalOptions.map(product => product.title).join(", ") : "Nenhuma"}</td> */}
                                    <td>{"Nenhuma"}</td>
                                    <td>{product.plansId[0] ? displayPlansNames(product.plansId) : "Nenhum"}</td>
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