import { FiAlignJustify, FiTrash2 } from "react-icons/fi";
import { DivisionLine } from '../../../../Divisions/DivisionLine';
import { useContext, useEffect, useState } from 'react';
import { FilterOptions } from '../../FilterOptions/FilterOptions';
import { ClubNavigationContext, DeletingPlansContext, InfoContext } from '../../../../../contexts/ClubDashboard/ClubDashboardContext';
import DarkNavButton from './utils/DarkNavButton/DarkNavButton';
import styles from "./styles.module.scss"
import { firstNavOptions } from './utils/firstNavOptions';

export function MyNavigation() {

    const { plansInfo } = useContext(InfoContext)

    const {
        deletingPlans,
        setDeletingPlans,
        deletePlans
    } = useContext(DeletingPlansContext)

    const {
        myNavScreenSelected,
        setMyNavScreenSelected
    } = useContext(ClubNavigationContext)

    const [whatToFilter, setWhatToFilter] = useState("Assinantes")
    const [showFilterOptions, setShowFilterOptions] = useState(false)

    useEffect(() => {
        firstNavOptions.forEach(opt => {
            if (myNavScreenSelected === opt.handleNavParam) return setWhatToFilter(opt.whatToFilter);
        })
    }, [myNavScreenSelected])

    function handleNavButton(screenSelected: string) {
        setMyNavScreenSelected(screenSelected)
        setShowFilterOptions(false)

        if (screenSelected !== "plans") setDeletingPlans(false)
    }

    return (
        <section
            className={styles.navContainer}
        >
            <div
                className={styles.subNavContainer}
            >
                {firstNavOptions.map((opt, index) => (
                    <DarkNavButton
                        key={index}
                        handleNavButton={handleNavButton}
                        handleNavParam={opt.handleNavParam}
                    >
                        {opt.buttonText}
                    </DarkNavButton>
                ))}
            </div>

            <DivisionLine />

            <div className={styles.subNavContainer}>
                <button
                    className={styles.filterButton}
                    disabled={deletingPlans}
                    onClick={() => setShowFilterOptions(!showFilterOptions)}
                >
                    Filtrar {whatToFilter} <FiAlignJustify style={{ marginLeft: "4px" }} />
                </button>

                {
                    showFilterOptions && !deletingPlans &&
                    <FilterOptions whatToFilter={whatToFilter} />
                }

                {
                    myNavScreenSelected === "plans" &&
                    <>
                        <button
                            className={styles.deleteButton}
                            onClick={() => {
                                !deletingPlans ? deletePlans(plansInfo) : setDeletingPlans(false)
                            }}
                        >
                            {
                                deletingPlans ?
                                    "Cancelar" :
                                    <>
                                        Deletar Planos                                        <FiTrash2 style={{ marginLeft: "4px" }} />
                                    </>

                            }
                        </button>
                    </>
                }
            </div>

        </section>
    )
}