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
    const [inputValue, setInputValue] = useState<string>("")
    const [showInput, setShowInput] = useState(false)
    const [originalSubscribersInfo] = useState(subscribersInfo)
    const [originalPlansInfo] = useState(plansInfo)

    function filterByUniqueParam(whatToFilter: string | null, optionSelected: string | null) {

        switch (whatToFilter) {
            case "Assinantes":
                const filteredSubscribers = originalSubscribersInfo.filter(option => {
                    if (!inputValue) return true
                    if (optionSelected === "Nome") return option.name.includes(inputValue)
                    if (optionSelected === "Email") return option.email.includes(inputValue)
                    if (optionSelected === "CPF") return option.cpf.includes(inputValue)
                })
                setSubscribersInfo(filteredSubscribers)
                break;

            case "Planos":
                // const filteredPlans = originalPlansInfo.filter(option => {                                        
                //     if(!inputValue) return true
                //     if(optionSelected === "Nome") return option.name.includes(inputValue)
                //     if(optionSelected === "Email") return option.email.includes(inputValue)
                //     if(optionSelected === "CPF") return option.cpf.includes(inputValue)
                // })
                // setSubscribersInfo(filteredSubscribers)
                break;

                break;
            case "Produtos":

                break;
            default:
                break;
        }
    }

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

    useEffect(() => {
        filterByUniqueParam(whatToFilter, optionSelected)
    }, [inputValue])

    return (
        <section className={styles.optionsWrapper}>
            {filterOptions.map((option, index) => {
                return (
                    <div key={index}>
                        <button

                            className={styles.filterOption}
                            onClick={(event) => {
                                if (optionSelected === option) {
                                    setOptionSelected(null)
                                    return setShowInput(false)
                                }
                                setInputValue("")
                                setOptionSelected(option)
                                return setShowInput(true)
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
                                value={inputValue}
                                onChange={(e) => setInputValue(e.currentTarget.value)}
                            />
                        }
                    </div>
                )
            })}
        </section>
    );
}