import { Button } from 'react-bootstrap';
import { FiAlignJustify } from "react-icons/fi";
import { DivisionLine } from '../../../Divisions/DivisionLine';
import { useEffect, useState } from 'react';
import { FilterOptions } from '../FilterOptions/FilterOptions';
import Nav from 'react-bootstrap/Nav';

//! Corrigir tipagem
export function MyNavigation({
    myNavDefaultActiveKey,
    myNavScreenSelected,
    setMyNavScreenSelected,
    plansInfo,
    setPlansInfo,
    productsInfo,
    setProductsInfo,
    subscribersInfo,
    setSubscribersInfo
}: any) {

    const [whatToFilter, setWhatToFilter] = useState("Assinantes")
    const [showFilterOptions, setShowFilterOptions] = useState(false)

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
                    setMyNavScreenSelected(eventKey)
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
                className="d-flex align-items-center justify-content-center mt-10"
                onClick={() => setShowFilterOptions(!showFilterOptions)}
            >
                Filtrar {whatToFilter} <FiAlignJustify style={{ marginLeft: "4px" }} />
            </Button>
            {showFilterOptions && <FilterOptions
                whatToFilter={whatToFilter}
                plansInfo={plansInfo}
                setPlansInfo={setPlansInfo}
                productsInfo={productsInfo}
                setProductsInfo={setProductsInfo}
                subscribersInfo={subscribersInfo}
                setSubscribersInfo={setSubscribersInfo}
            />}
        </section>
    )
}