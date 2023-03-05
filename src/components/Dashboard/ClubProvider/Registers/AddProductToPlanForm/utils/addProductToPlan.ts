import axios from "axios"
import { MouseEvent, SetStateAction } from "react"
import { Plan } from "../../../../../../@types/PlansTypes"
import { Product } from "../../../../../../@types/ProductTypes"

export async function addProductToPlan(
    e: MouseEvent<HTMLButtonElement>,
    planId: string | string[],
    productId: string | string[],
    clubProviderId: string,
    setUpdateProducts: (value: SetStateAction<boolean>) => void,
    setSelectedPlanInAddPlan: (value: SetStateAction<Plan | null>) => void,
    setSelectedProductInAddPlan: (value: SetStateAction<Product | null>) => void,

) {
    e.preventDefault()

    const addProductToPlan = { productId }

    try {
        const response = await axios.put(`/api/club_providers/id/${clubProviderId}/plans/${planId}`, addProductToPlan)

        setSelectedPlanInAddPlan(null)
        setSelectedProductInAddPlan(null)
        setTimeout(() => {
            setUpdateProducts(true)
        }, 500)
    }
    catch (err) {
        alert("Houve um erro ao realizar o registro.")
        console.error(err)
    }

}