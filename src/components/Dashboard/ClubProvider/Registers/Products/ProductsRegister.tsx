import { useState } from "react";
import { Col } from "react-bootstrap";
import { DivisionColumn } from "../../../../Divisions/DivisionColumn";
import styles from "../../../../../styles/pages/clubDashboard.module.scss"
import { ProductForm } from "../../Forms/ProductForm";
import { AddProductToPlanForm } from "../../Forms/AddProductToPlanForm";

export function ProductsRegister({
    clubProviderInfo,
    setUpdateProducts,
    plansInfo,
    productsInfo
}: any) {

    const [showAddPlanModal, setShowAddPlanModal] = useState(false)
    const [selectedPlanInAddPlan, setSelectedPlanInAddPlan] = useState<any>(null)
    const [selectedProductInAddPlan, setSelectedProductInAddPlan] = useState<any>(null)

    return (
        <section className="d-flex justify-content-around position-relative">
            <Col md={showAddPlanModal ? "5" : "auto"} >
                <ProductForm
                    clubProviderInfo={clubProviderInfo}
                    setShowAddPlanModal={setShowAddPlanModal}
                    setUpdateProducts={setUpdateProducts}
                    showAddPlanModal={showAddPlanModal}
                />
            </Col>
            <Col md="auto" className={showAddPlanModal ? "" : "visually-hidden"}>
                <DivisionColumn />
            </Col>
            <Col md={6} className={showAddPlanModal ? `${styles.growScale}` : "visually-hidden"}>
                <AddProductToPlanForm
                    setShowAddPlanModal={setShowAddPlanModal}
                    setSelectedPlanInAddPlan={setSelectedPlanInAddPlan}
                    setSelectedProductInAddPlan={setSelectedProductInAddPlan}
                    selectedPlanInAddPlan={selectedPlanInAddPlan}
                    plansInfo={plansInfo}
                    selectedProductInAddPlan={selectedProductInAddPlan}
                    productsInfo={productsInfo}
                    clubProviderInfo={clubProviderInfo}
                    setUpdateProducts={setUpdateProducts}
                />
            </Col>
        </section>
    )
}