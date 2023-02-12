import { SetStateAction, useEffect, useState } from "react";
import { ListGroup, Tab } from "react-bootstrap";
import { Plan } from "../../../../@types/PlansTypes";
import { Product } from "../../../../@types/ProductTypes";
import { Subscriber } from "../../../../@types/SubscriberTypes";
import { PLANS_PROPERTIES, PRODUCTS_PROPERTIES, SUBS_PROPERTIES } from "../Tables/utils/myClubProperties";
import { sortListByOption } from "./utils/sortListByOption";

type FilterOptionsType = {
    whatToFilter: string | null;
    plansInfo: Plan[],
    setPlansInfo: (value: SetStateAction<Plan[]>) => void,
    productsInfo: Product[] , 
    setProductsInfo: (value: SetStateAction<Product[]>) => void,
    subscribersInfo: Subscriber[], 
    setSubscribersInfo: (value: SetStateAction<Subscriber[]>) => void,
}

export function FilterOptions({
    whatToFilter,
    plansInfo,
    setPlansInfo,
    productsInfo,
    setProductsInfo,
    subscribersInfo,
    setSubscribersInfo,
}: FilterOptionsType) {

    const [filterOptions, setFIlterOptions] = useState<string[] | []>([]) 
    const [optionSelected, setOptionSelected] = useState<string | null>(null)

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