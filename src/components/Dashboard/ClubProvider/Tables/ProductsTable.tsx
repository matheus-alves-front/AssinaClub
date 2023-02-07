import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { getPlansInfo } from '../../../../utils/getPlansInfo';
import { getProductsInfo } from '../../../../utils/getProductsInfo';
import { PRODUCTS_PROPERTIES } from './utils/myClubProperties';

export function ProductsTable({ clubProviderInfo, subscribersInfo, updateProducts, setUpdateProducts }: any) {

    const [plansInfo, setPlansInfo] = useState<any[]>([]) //! Corrigir tipagem
    const [productsInfo, setProductsInfo] = useState<any[]>([]) //! Corrigir tipagem

    useEffect(() => {
        handlePlansInfo()
        handleProductsInfo()
    }, [subscribersInfo])

    useEffect(() => {
        if(updateProducts) {
            handleProductsInfo()
            setUpdateProducts(false)
        }
    }, [updateProducts])

    async function handlePlansInfo() {
        if (subscribersInfo) setPlansInfo(await getPlansInfo(clubProviderInfo?.id))
    }

    async function handleProductsInfo() {
        if (clubProviderInfo) setProductsInfo(await getProductsInfo(clubProviderInfo.id))
    }

    function displayPlansNames(plansIds: any[]) { //! Corrigir tipagem
        const plansNames: any = [] //! Corrigir tipagem

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
                            {productsInfo.map((product: any, index: number) => ( //! Corrigir tipagem
                                <tr key={index}>
                                    <td>{++index}</td>
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>{"R$ " + product.value.toFixed(2)}</td>
                                    <td>{product.sku}</td>
                                    <td>{product.additionalOptions[0] ? product.additionalOptions.map(product => product.title).join(", ") : "Nenhuma"}</td>
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