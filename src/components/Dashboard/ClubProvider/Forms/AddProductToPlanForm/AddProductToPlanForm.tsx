import { useContext } from "react"
import { Button, CloseButton, Col, Container, Form, Row } from "react-bootstrap"
import { ClubDashboardUpdateContext, InfoContext } from "../../../../../contexts/ClubDashboard/ClubDashboardContext"
import { ProductRegisterContext } from "../../../../../contexts/ClubDashboard/ProductRegisterContext/ProductRegisterContext"
import { ClubDashboardGlobalContext } from "../../../../../contexts/ClubDashboard/ClubDashboardGlobalContext"
import { DivisionLine, DivisionLineWithoutMargin } from "../../../../Divisions/DivisionLine"
import { addProductToPlan } from "../../Registers/Products/utils/addProductToPlan"
import { DropDownSelector } from "../DropDownSelector"
import styles from './styles.module.scss'

export function AddProductToPlanForm() {

    const {
        setShowAddPlanModal,
        selectedPlanInAddPlan,
        setSelectedPlanInAddPlan,
        selectedProductInAddPlan,
        setSelectedProductInAddPlan,
    } = useContext(ProductRegisterContext)

    const {
        plansInfo,
        productsInfo
    } = useContext(InfoContext)

    const {
        clubProviderInfo,
    } = useContext(ClubDashboardGlobalContext)

    const {
        setUpdateProducts
    } = useContext(ClubDashboardUpdateContext)

    return (
        <>
            <section
                className={styles.addProdWrapper}
            >
                <div
                    onClick={() => {
                        setShowAddPlanModal(false)
                        setSelectedPlanInAddPlan(null)
                        setSelectedProductInAddPlan(null)
                    }}
                />
                <form
                    className={styles.formWrapper}
                >
                    <p>Selecione um Plano</p>
                    <div>
                        <DropDownSelector
                            selectedInfoInAddPlan={selectedPlanInAddPlan}
                            infoType="plan"
                            selectedInfo={plansInfo}
                            setSelectedInfoInAddPlan={setSelectedPlanInAddPlan}
                        />
                    </div>

                    <p>Selecione um Produto</p>
                    <div className="d-flex">
                        <DropDownSelector
                            selectedInfoInAddPlan={selectedProductInAddPlan}
                            infoType="product"
                            selectedInfo={productsInfo}
                            setSelectedInfoInAddPlan={setSelectedProductInAddPlan}
                        />
                    </div>

                    <button
                        onClick={(e) => {
                            if (
                                !selectedPlanInAddPlan ||
                                !selectedProductInAddPlan ||
                                !clubProviderInfo
                            ) return

                            addProductToPlan(
                                e,
                                selectedPlanInAddPlan.id,
                                selectedProductInAddPlan.id,
                                clubProviderInfo.id,
                                setUpdateProducts,
                                setShowAddPlanModal,
                                setSelectedPlanInAddPlan,
                                setSelectedProductInAddPlan
                            )
                        }}
                        disabled={!(selectedProductInAddPlan !== null && selectedPlanInAddPlan !== null)}
                    >
                        Registrar Produto ao Plano
                    </button>
                </form>
            </section>
        </>
    )
}