import { createContext, SetStateAction } from "react";
import { Plan } from "../../../@types/PlansTypes";
import { Product } from "../../../@types/ProductTypes";

type ProductRegisterContextType = {
    showAddPlanModal: boolean
    setShowAddPlanModal: (value: SetStateAction<boolean>) => void
    selectedPlanInAddPlan: Plan | null
    setSelectedPlanInAddPlan: (value: SetStateAction<Plan | null>) => void 
    selectedProductInAddPlan: Product | null
    setSelectedProductInAddPlan: (value: SetStateAction<Product | null>) => void 
}

export const ProductRegisterContext = createContext({} as ProductRegisterContextType)