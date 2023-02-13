import { Button } from 'react-bootstrap';
import { FiAlignJustify, FiTrash2 } from "react-icons/fi";
import { DivisionLine } from '../../../Divisions/DivisionLine';
import { useContext, useEffect, useState } from 'react';
import { FilterOptions } from '../FilterOptions/FilterOptions';
import Nav from 'react-bootstrap/Nav';
import { ClubNavigationContext, DeletingPlansContext, InfoContext } from '../../../../contexts/ClubDashboard/ClubDashboardContext';
import { myNavDefaultActiveKey } from '../../../../utils/ClubDashboard/navDefaultKeys';

export function MyNavigation() {

    const {
        plansInfo,
    } = useContext(InfoContext)

    const {
        deletingPlans,
        setDeletingPlans,
        deletePlans
    } = useContext(DeletingPlansContext)

    const {
        myNavScreenSelected,
        setMyNavScreenSelected
    } = useContext(ClubNavigationContext)

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

            {showFilterOptions && !deletingPlans && <FilterOptions whatToFilter={whatToFilter} />}

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