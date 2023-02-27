import { useContext, useEffect, useState } from "react";
import { PLANS_PROPERTIES, PRODUCTS_PROPERTIES, SUBS_PROPERTIES } from "../Tables/utils/myClubProperties";
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
            {filterOptions.map((option, index) => (
                <button
                    key={index}
                    className={styles.filterOption}
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

                    <UpDownFilterArrows
                        optionSelected={optionSelected}
                        setOptionSelected={setOptionSelected}
                        option={option}
                    />
                </button>
            ))}
        </section>
    );
}