import { SetStateAction, useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { DivisionColumn } from "../../../../Divisions/DivisionColumn";
import styles from "../../../../../styles/pages/clubDashboard.module.scss"
import { ProductForm } from "../../Forms/ProductForm";
import { AddProductToPlanForm } from "../../Forms/AddProductToPlanForm";
import { ClubProvider } from "../../../../../@types/ClubProviderTypes";
import { Product } from "../../../../../@types/ProductTypes";
import { Plan, PlansType } from "../../../../../@types/PlansTypes";

type ProductsRegisterProps = {
    clubProviderInfo: ClubProvider | null
    setUpdateProducts: (value: SetStateAction<boolean>) => void
    plansInfo: Plan[]
    productsInfo: Product[]
}

export function ProductsRegister({
    clubProviderInfo,
    setUpdateProducts,
    plansInfo,
    productsInfo
}: ProductsRegisterProps) {
    const [showAddPlanModal, setShowAddPlanModal] = useState(false)
    const [selectedPlanInAddPlan, setSelectedPlanInAddPlan] = useState<Plan | null>(null)
    const [selectedProductInAddPlan, setSelectedProductInAddPlan] = useState<Product | null>(null)

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