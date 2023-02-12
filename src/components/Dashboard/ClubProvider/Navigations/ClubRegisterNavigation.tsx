import { SetStateAction } from 'react';
import Nav from 'react-bootstrap/Nav';

type ClubProviderNavigationProps = {
    clubRegNavDefaultActiveKey: string 
    clubRegNavScreenSelected: string
    setClubRegNavScreenSelected: (value: SetStateAction<string>) => void
}

export function ClubRegisterNavigation({
    clubRegNavDefaultActiveKey, 
    clubRegNavScreenSelected, 
    setClubRegNavScreenSelected
}: ClubProviderNavigationProps) { 
    
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