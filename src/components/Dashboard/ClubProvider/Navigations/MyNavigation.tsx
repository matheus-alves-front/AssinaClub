import { Button, Container } from 'react-bootstrap';
import { FiEdit } from "react-icons/fi";
import Nav from 'react-bootstrap/Nav';
import { DivisionLine } from '../../../Divisions/DivisionLine';
import { useEffect, useState } from 'react';
import { FilterOptions } from '../FilterOptions/FilterOptions';

//! Corrigir tipagem
export function MyNavigation({ myNavDefaultActiveKey, myNavScreenSelected, setMyNavScreenSelected }: any) {

    const [whatToFilter, setWhatToFilter] = useState("Assinantes")
    const [showFilterOptions, setShowFilterOptions] = useState(false)

    useEffect(() => {
        if (myNavScreenSelected === "subscribers") return setWhatToFilter('Assinantes')
        if (myNavScreenSelected === "plans") return setWhatToFilter('Planos')
        if (myNavScreenSelected === "products") return setWhatToFilter('Produtos')
    }, [myNavScreenSelected])

    return (
        <section>
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
                        className={`text-center ${myNavScreenSelected === "subscribers" ? "text-white" : ""}`}
                    >
                        Meus Assinantes
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link
                        eventKey="plans"
                        className={`text-center ${myNavScreenSelected === "plans" ? "text-white" : ""}`}
                    >
                        Meus Planos
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link
                        eventKey="products"
                        className={`text-center ${myNavScreenSelected === "products" ? "text-white" : ""}`}
                    >
                        Meus Produtos
                    </Nav.Link>
                </Nav.Item>
                <DivisionLine />
            </Nav>

            <Button
                variant="outline-dark"
                onClick={() => setShowFilterOptions(!showFilterOptions)}
            >
                Filtrar {whatToFilter} <FiEdit />
            </Button>
            {showFilterOptions && <FilterOptions whatToFilter={whatToFilter} />}
        </section>
    )
}