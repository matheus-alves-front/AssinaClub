import { useEffect, useState } from "react";
import { Col, ListGroup, Row, Tab } from "react-bootstrap";
import { PLANS_PROPERTIES, PRODUCTS_PROPERTIES, SUBS_PROPERTIES } from "../Tables/utils/myClubProperties";

export function FilterOptions({ whatToFilter }: any) { //! Corrigir tipagem

    const [filterOptions, setFIlterOptions] = useState<any[]>([]) //! Corrigir tipagem

    useEffect(() => {
        switch (whatToFilter) {
            case "Assinantes":
                setFIlterOptions(SUBS_PROPERTIES)
                break;
            case "Planos":
                setFIlterOptions(PLANS_PROPERTIES)
                break;
            case "Produtos":
                setFIlterOptions(PRODUCTS_PROPERTIES)
                break;
            default: break;
        }
    }, [])

    return (
        <Tab.Container defaultActiveKey="#link1">
            <ListGroup>
                {filterOptions.map(option => (
                    <ListGroup.Item action href={`#${option}`}>
                        {option}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Tab.Container>
    );
}