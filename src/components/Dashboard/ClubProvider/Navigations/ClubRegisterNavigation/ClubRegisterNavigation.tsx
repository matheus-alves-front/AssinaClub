import { useContext } from 'react';
import Nav from 'react-bootstrap/Nav';
import { ClubNavigationContext } from '../../../../../contexts/ClubDashboard/ClubDashboardContext';
import { clubRegNavDefaultActiveKey } from '../../../../../utils/ClubDashboard/navDefaultKeys';

export function ClubRegisterNavigation() {

    const {
        clubRegNavScreenSelected,
        setClubRegNavScreenSelected
    } = useContext(ClubNavigationContext)

    return (
        <>
            <Nav
                variant="pills"
                defaultActiveKey={clubRegNavDefaultActiveKey}
                onSelect={(eventKey) => {
                    setClubRegNavScreenSelected(String(eventKey))
                }}
                className="d-flex flex-column"
            >
                <Nav.Item>
                    <Nav.Link
                        eventKey="products"
                        className={`text-center ${clubRegNavScreenSelected === "products" ? "text-white bg-dark" : ""}`}
                    >
                        Registrar Produtos
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link
                        eventKey="plans"
                        className={`text-center ${clubRegNavScreenSelected === "plans" ? "text-white bg-dark" : ""}`}
                    >
                        Registrar Planos
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        </>
    )
}