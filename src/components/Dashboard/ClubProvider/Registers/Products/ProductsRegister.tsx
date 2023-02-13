import { useState } from "react";
import { Col } from "react-bootstrap";
import { DivisionColumn } from "../../../../Divisions/DivisionColumn";
import styles from "../../../../../styles/pages/clubDashboard.module.scss"
import { ProductForm } from "../../Forms/ProductForm";
import { AddProductToPlanForm } from "../../Forms/AddProductToPlanForm";
import { Product } from "../../../../../@types/ProductTypes";
import { Plan } from "../../../../../@types/PlansTypes";
import { ProductRegisterContext } from "../../../../../contexts/ClubDashboard/ProductRegisterContext/ProductRegisterContext";

export function ProductsRegister() {

    const [showAddPlanModal, setShowAddPlanModal] = useState(false)
    const [selectedPlanInAddPlan, setSelectedPlanInAddPlan] = useState<Plan | null>(null)
    const [selectedProductInAddPlan, setSelectedProductInAddPlan] = useState<Product | null>(null)

    return (
        <ProductRegisterContext.Provider value={{
            showAddPlanModal, setShowAddPlanModal,
            selectedPlanInAddPlan, setSelectedPlanInAddPlan,
            selectedProductInAddPlan, setSelectedProductInAddPlan,
        }}>

            <section className="d-flex justify-content-around position-relative">
                <Col md={showAddPlanModal ? "5" : "auto"} >
                    <ProductForm/>
                </Col>
                <Col md="auto" className={showAddPlanModal ? "" : "visually-hidden"}>
                    <DivisionColumn />
                </Col>
                <Col md={6} className={showAddPlanModal ? `${styles.growScale}` : "visually-hidden"}>
                    <AddProductToPlanForm />
                </Col>
            </section>
        </ProductRegisterContext.Provider>
    )
}