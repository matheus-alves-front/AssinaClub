import axios from "axios"

//! Corrigir tipagem
export async function addProductToPlan(
    e: any,
    planId: string | string[],
    productId: string | string[],
    clubProviderId: string,
    setUpdateProducts: any,
    setShowAddPlanModal: any,
    setSelectedPlanInAddPlan: any,
    setSelectedProductInAddPlan: any

) {
    e.preventDefault()

    const addProductToPlan = { productId }

    try {
        await axios.put(`/api/club_providers/id/${clubProviderId}/plans/${planId}`, addProductToPlan)
        setShowAddPlanModal(false)
        setSelectedPlanInAddPlan(null)
        setSelectedProductInAddPlan(null)
        setTimeout(() => {
            setUpdateProducts(true)
        }, 500)
    }
    catch (err) {
        alert("Houve um erro ao realizar o registro.")
        console.log(err)
    }

}