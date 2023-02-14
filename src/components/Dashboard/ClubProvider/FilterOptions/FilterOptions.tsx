import { useContext, useEffect, useState } from "react";
import { ListGroup, Tab } from "react-bootstrap";
import { FiChevronsDown, FiChevronsUp } from "react-icons/fi";
import { PLANS_PROPERTIES, PRODUCTS_PROPERTIES, SUBS_PROPERTIES } from "../Tables/utils/myClubProperties";
import { sortListByOption } from "./utils/sortListByOption";
import styles from "../../../../styles/pages/clubDashboard.module.scss"
import { InfoContext } from "../../../../contexts/ClubDashboard/ClubDashboardContext";

type FilterOptionsType = {
    whatToFilter: string | null;
}

export function FilterOptions({ whatToFilter }: FilterOptionsType) {

    const {
        subscribersInfo,
        setSubscribersInfo,
        plansInfo,
        setPlansInfo,
        productsInfo,
        setProductsInfo
    } = useContext(InfoContext)


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
                                className={
                                    optionSelected === option
                                        ? "bg-dark text-white d-flex justify-content-between align-items-center"
                                        : "d-flex justify-content-between align-items-center"
                                }
                                style={{ transition: "all 0.2s" }}
                                onClick={(event) => {
                                    setOptionSelected(option)
                                    sortListByOption(
                                        event,
                                        option,
                                        plansInfo,
                                        setPlansInfo,
                                        productsInfo,
                                        setProductsInfo,
                                        subscribersInfo,
                                        setSubscribersInfo,
                                        "ascendant"
                                    )
                                }}
                            >
                                {option}

                                <div className="ms-3 d-flex">
                                    <div
                                        className={`
                                            d-flex justify-content-center align-items-center 
                                            ${optionSelected === option ? styles.filterOptionsBlack : styles.filterOptions}
                                        `}
                                        style={{
                                            width: '20px',
                                            height: '20px',
                                            borderRadius: "10px"
                                        }}
                                        onClick={(event) => {
                                            setOptionSelected(option)
                                            sortListByOption(
                                                event,
                                                option,
                                                plansInfo,
                                                setPlansInfo,
                                                productsInfo,
                                                setProductsInfo,
                                                subscribersInfo,
                                                setSubscribersInfo,
                                                "descendant"
                                            )
                                        }}
                                    >
                                        <FiChevronsDown />
                                    </div>
                                    <div
                                        className={`
                                            ms-1 d-flex justify-content-center align-items-center 
                                            ${optionSelected === option ? styles.filterOptionsBlack : styles.filterOptions}
                                        `}
                                        style={{
                                            width: '20px',
                                            height: '20px',
                                            borderRadius: "10px"
                                        }}
                                        onClick={(event) => {
                                            setOptionSelected(option)
                                            sortListByOption(
                                                event,
                                                option,
                                                plansInfo,
                                                setPlansInfo,
                                                productsInfo,
                                                setProductsInfo,
                                                subscribersInfo,
                                                setSubscribersInfo,
                                                "ascendant"
                                            )
                                        }}
                                    >
                                        <FiChevronsUp />
                                    </div>
                                </div>
                            </ListGroup.Item>
                        )
                    })}
                </ListGroup>
            </Tab.Container>
        </>
    );
}