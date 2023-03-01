import { createContext, SetStateAction } from "react";
import { Plan } from "../../../@types/PlansTypes";
import { Product } from "../../../@types/ProductTypes";

type AddProdToPlanContextType = {
    selectedPlanInAddPlan: Plan | null
    setSelectedPlanInAddPlan: (value: SetStateAction<Plan | null>) => void 
    selectedProductInAddPlan: Product | null
    setSelectedProductInAddPlan: (value: SetStateAction<Product | null>) => void 
}

export const AddProdToPlanContext = createContext({} as AddProdToPlanContextType)