import Nav from 'react-bootstrap/Nav';

//! Corrigir tipagem
export function ClubRegisterNavigation({clubRegNavDefaultActiveKey, clubRegNavScreenSelected, setClubRegNavScreenSelected}: any) { 
    
    return (
        <>
            <Nav
                variant="pills"
                defaultActiveKey={clubRegNavDefaultActiveKey}
                onSelect={(eventKey) => {
                    setClubRegNavScreenSelected(eventKey)
                }}
                className="d-flex flex-column"
            >
                <Nav.Item>
                    <Nav.Link
                        eventKey="products"
                        className={`text-center ${clubRegNavScreenSelected === "products" ? "text-white" : ""}`}
                    >
                        Registrar Produtos
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link
                        eventKey="plans"
                        className={`text-center ${clubRegNavScreenSelected === "plans" ? "text-white" : ""}`}
                    >
                        Registrar Planos
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        </>
    )
}