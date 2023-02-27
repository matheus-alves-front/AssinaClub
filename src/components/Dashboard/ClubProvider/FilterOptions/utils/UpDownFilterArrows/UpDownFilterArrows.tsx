import { SetStateAction, useContext } from "react"
import { FiChevronsDown, FiChevronsUp } from "react-icons/fi"
import { InfoContext } from "../../../../../../contexts/ClubDashboard/ClubDashboardContext"
import { sortListByOption } from "../sortListByOption"
import styles from "./styles.module.scss"

type UpDownFilterArrowsType = {
    option: string
}

export default function UpDownFilterArrows({
    option
}: UpDownFilterArrowsType) {

    const {
        subscribersInfo,
        setSubscribersInfo,
        plansInfo,
        setPlansInfo,
        productsInfo,
        setProductsInfo
    } = useContext(InfoContext)


    return (
        <section className={styles.arrowsWrapper}>
            <div
                className={styles.filterOptions}
                onClick={(event) => {
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
                className={styles.filterOptions}
                onClick={(event) => {
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
        </section>
    )
}