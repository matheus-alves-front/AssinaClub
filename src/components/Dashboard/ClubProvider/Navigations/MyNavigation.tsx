import { Button } from 'react-bootstrap';
import { FiAlignJustify, FiTrash2 } from "react-icons/fi";
import { DivisionLine } from '../../../Divisions/DivisionLine';
import { SetStateAction, useEffect, useState } from 'react';
import { FilterOptions } from '../FilterOptions/FilterOptions';
import Nav from 'react-bootstrap/Nav';
import { Plan } from '../../../../@types/PlansTypes';
import { Product } from '../../../../@types/ProductTypes';
import { Subscriber } from '../../../../@types/SubscriberTypes';

type MyNavigationType = {
    myNavDefaultActiveKey: string,
    myNavScreenSelected: string,
    plansInfo: Plan[],
    productsInfo: Product[],
    subscribersInfo: Subscriber[],
    deletingPlans: boolean,
    setMyNavScreenSelected: (value: SetStateAction<string>) => void,
    setPlansInfo: (value: SetStateAction<Plan[]>) => void,
    setProductsInfo: (value: SetStateAction<Product[]>) => void,
    setSubscribersInfo: (value: SetStateAction<Subscriber[]>) => void,
    setDeletingPlans: (value: SetStateAction<boolean>) => void,
    setPlansThatCanBeDeleted: (value: SetStateAction<Plan[]>) => void,
}

export function MyNavigation({
    myNavDefaultActiveKey,
    myNavScreenSelected,
    setMyNavScreenSelected,
    plansInfo,
    setPlansInfo,
    productsInfo,
    setProductsInfo,
    subscribersInfo,
    setSubscribersInfo,
    setDeletingPlans,
    deletingPlans,
    setPlansThatCanBeDeleted
}: MyNavigationType) {

    const [whatToFilter, setWhatToFilter] = useState("Assinantes")
    const [showFilterOptions, setShowFilterOptions] = useState(false)

    function deletePlans(plansInfo: Plan[]) {
        const filteredPlans = [...plansInfo].filter(plan => plan.subscriberIds.length === 0)
        setPlansThatCanBeDeleted(filteredPlans)
        setDeletingPlans(true)
    }

    useEffect(() => {
        if (myNavScreenSelected === "subscribers") return setWhatToFilter('Assinantes')
        if (myNavScreenSelected === "plans") return setWhatToFilter('Planos')
        if (myNavScreenSelected === "products") return setWhatToFilter('Produtos')
    }, [myNavScreenSelected])

    return (
        <section className='d-flex flex-column'>
            <Nav
                variant="pills"
                defaultActiveKey={myNavDefaultActiveKey}
                onSelect={(eventKey) => {
                    setMyNavScreenSelected(String(eventKey))
                    setShowFilterOptions(false)
                }}
                className="d-flex flex-column"
            >
                <Nav.Item>
                    <Nav.Link
                        eventKey="subscribers"
                        className={`text-center ${myNavScreenSelected === "subscribers" ? "text-white bg-dark" : ""}`}
                    >
                        Meus Assinantes
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link
                        eventKey="plans"
                        className={`text-center ${myNavScreenSelected === "plans" ? "text-white bg-dark" : ""}`}
                    >
                        Meus Planos
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link
                        eventKey="products"
                        className={`text-center ${myNavScreenSelected === "products" ? "text-white bg-dark" : ""}`}
                    >
                        Meus Produtos
                    </Nav.Link>
                </Nav.Item>
            </Nav>

            <DivisionLine />

            <Button
                variant="outline-dark"
                disabled={deletingPlans}
                className="d-flex align-items-center justify-content-center"
                onClick={() => setShowFilterOptions(!showFilterOptions)}
            >
                Filtrar {whatToFilter} <FiAlignJustify style={{ marginLeft: "4px" }} />
            </Button>
            {showFilterOptions && !deletingPlans && <FilterOptions
                whatToFilter={whatToFilter}
                plansInfo={plansInfo}
                setPlansInfo={setPlansInfo}
                productsInfo={productsInfo}
                setProductsInfo={setProductsInfo}
                subscribersInfo={subscribersInfo}
                setSubscribersInfo={setSubscribersInfo}
            />}
            {
                (myNavScreenSelected === "plans") && (
                    <>
                        <Button
                            style={{ marginTop: "20px" }}
                            variant={deletingPlans ? "danger" : "outline-danger"}
                            className="d-flex align-items-center justify-content-center"
                            onClick={() => deletePlans(plansInfo)}
                        >
                            Deletar Planos <FiTrash2 style={{ marginLeft: "4px" }} />
                        </Button>
                        <Button
                            style={{ marginTop: "10px" }}
                            variant="outline-danger"
                            className={deletingPlans ? "" : "visually-hidden"}
                            onClick={() => setDeletingPlans(false)}
                        >
                            Cancelar
                        </Button>
                    </>

                )
            }

        </section>
    )
}