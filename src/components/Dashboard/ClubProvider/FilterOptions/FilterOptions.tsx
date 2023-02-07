import { useEffect, useState } from "react";
import { ListGroup, Tab } from "react-bootstrap";
import { PLANS_PROPERTIES, PRODUCTS_PROPERTIES, SUBS_PROPERTIES } from "../Tables/utils/myClubProperties";
import { sortListByOption } from "./utils/sortListByOption";

export function FilterOptions({
    whatToFilter,
    plansInfo,
    setPlansInfo,
    productsInfo,
    setProductsInfo,
    subscribersInfo,
    setSubscribersInfo,
}: any) { //! Corrigir tipagem

    const [filterOptions, setFIlterOptions] = useState<any[]>([]) //! Corrigir tipagem
    const [optionSelected, setOptionSelected] = useState(null)

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
            default:
                break;
        }
    }, [])

    return (
        <>
            <Tab.Container>
                <ListGroup style={{ marginTop: "20px" }}>
                    {filterOptions.map((option, index) => {

                        if (
                            option === 'nº' ||
                            option === 'Descrição' ||
                            option === 'Opções adicionais' ||
                            option === 'Planos'
                        ) return

                        return (
                            <ListGroup.Item key={index}
                                action
                                className={optionSelected === option ? "bg-dark text-white" : ""}
                                style={{ transition: "all 0.2s" }}
                                onClick={() => {
                                    setOptionSelected(option)
                                    sortListByOption(
                                        option,
                                        plansInfo,
                                        setPlansInfo,
                                        productsInfo,
                                        setProductsInfo,
                                        subscribersInfo,
                                        setSubscribersInfo,
                                    )
                                }}
                            >
                                {option}
                            </ListGroup.Item>
                        )
                    })}
                </ListGroup>
            </Tab.Container>
        </>
    );
}