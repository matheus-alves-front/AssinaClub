import { useState } from "react";
import styles from "./styles.module.scss"
import { ProductForm } from "../../Forms/ProductForm/ProductForm";
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
            <section className={styles.registerWrapper}>
                <ProductForm />
            </section>
        </ProductRegisterContext.Provider>
    )
}