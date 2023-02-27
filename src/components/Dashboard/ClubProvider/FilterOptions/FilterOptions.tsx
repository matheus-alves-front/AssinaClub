import { useContext, useEffect, useState } from "react";
import { PLANS_PROPERTIES, PRODUCTS_PROPERTIES, SUBS_PROPERTIES } from "../Lists/utils/myClubProperties";
import { sortListByOption } from "./utils/sortListByOption";
import { InfoContext } from "../../../../contexts/ClubDashboard/ClubDashboardContext";
import UpDownFilterArrows from "./utils/UpDownFilterArrows/UpDownFilterArrows";
import styles from "./styles.module.scss"

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
    const [showInput, setShowInput] = useState(false)

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
        <section className={styles.optionsWrapper}>
            {filterOptions.map((option, index) => {
                return (
                    <>
                        <button
                            key={index}
                            className={styles.filterOption}
                            onClick={(event) => {

                                if (['Nome', 'SKU', 'CPF', 'Email'].includes(option)) {
                                    setOptionSelected(option)
                                    return setShowInput(true)
                                }

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
                            {
                                ['Nome', 'SKU', 'CPF', 'Email'].includes(option) ?
                                    <></> :
                                    <UpDownFilterArrows option={option} />
                            }
                        </button>
                        {
                            optionSelected === option && showInput &&
                            <input
                                className={styles.filterInput}
                                placeholder={`Filtre pelo ${option}...`}
                            />
                        }
                    </>
                )
            })}
        </section>
    );
}