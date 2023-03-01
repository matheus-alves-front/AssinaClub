import { useContext, useEffect, useState } from "react"
import { ClubDashboardUpdateContext, ClubNavigationContext } from "../../../../../contexts/ClubDashboard/ClubDashboardContext"
import { ClubDashboardGlobalContext } from "../../../../../contexts/ClubDashboard/ClubDashboardGlobalContext"
import { Plan } from "@prisma/client"
import { Product } from "../../../../../@types/ProductTypes"
import styles from './styles.module.scss'
import { addProductToPlan } from "./utils/addProductToPlan"
import { AddProdToPlanContext } from "../../../../../contexts/ClubDashboard/AddProdToPlanContext/AddProdToPlanContext"
import ProductCard from "../../Lists/Cards/ProductCard/ProductCard"
import PlanCard from "../../Lists/Cards/PlanCard/PlanCard"

export function AddProductToPlanForm() {


    const {
        clubProviderInfo,
    } = useContext(ClubDashboardGlobalContext)

    const {
        setUpdateProducts
    } = useContext(ClubDashboardUpdateContext)

    const {
        setMyNavScreenSelected,
        setFocusMode,
        focusMode
    } = useContext(ClubNavigationContext)

    const {
        selectedPlanInAddPlan,
        setSelectedPlanInAddPlan,
        selectedProductInAddPlan,
        setSelectedProductInAddPlan
    } = useContext(AddProdToPlanContext)

    return (
        <section className={styles.globalSection}>
            <div
                className={styles.leftSection}
            >
                <form
                    className={styles.formWrapper}
                >
                    <button
                        className={styles.reverseDarkButton}
                        onClick={(e) => {
                            e.preventDefault()
                            setMyNavScreenSelected("plans")
                            setFocusMode("plans")
                        }}
                    >
                        Selecione um Plano
                    </button>

                    <button
                        className={styles.reverseDarkButton}
                        onClick={(e) => {
                            e.preventDefault()
                            setMyNavScreenSelected("products")
                            setFocusMode("products")
                        }}
                    >
                        Selecione um Produto
                    </button>

                    <button
                        className={styles.darkButton}
                        onClick={(e) => {
                            if (
                                !selectedPlanInAddPlan || !selectedProductInAddPlan ||
                                !clubProviderInfo
                            ) return

                            addProductToPlan(
                                e,
                                selectedPlanInAddPlan.id,
                                selectedProductInAddPlan.id,
                                clubProviderInfo.id,
                                setUpdateProducts,
                                setSelectedPlanInAddPlan,
                                setSelectedProductInAddPlan
                            )
                        }}
                        disabled={!(selectedProductInAddPlan !== null && selectedPlanInAddPlan !== null)}
                    >
                        Registrar
                    </button>
                </form>
            </div>
            {
                selectedProductInAddPlan &&

                <div className={styles.rightSection}>
                    <p>Produto Selecionado:</p>
                    <ProductCard product={selectedProductInAddPlan} />
                </div>
            }
            {
                selectedPlanInAddPlan &&

                <div className={styles.rightSection}>
                    <p>Plano Selecionado:</p>
                    <PlanCard plan={selectedPlanInAddPlan} />
                </div>
            }
        </section>
    )
}