import axios from "axios"
import { SetStateAction } from "react"
import { Plan } from "../../../../../../@types/PlansTypes"

export async function deletePlanAndUpdate(
    planId: string | string[],
    clubProviderId: string,
    setPlanBeingDeleted: (value: SetStateAction<Plan | null>) => void,
    setUpdatePlans: (value: SetStateAction<boolean>) => void 
) {

    const deletePlanUrl = `/api/club_providers/id/${clubProviderId}/plans/${planId}`

    try {
        await axios.delete(deletePlanUrl)
        setTimeout(() => {
            setUpdatePlans(true)
            setPlanBeingDeleted(null)
        }, 500)
    }
    catch (err) {
        console.log(err)
        setPlanBeingDeleted(null)
    }
}

export async function deletePlanAndDontUpdate(
    planId: string | string[],
    clubProviderId: string,
) {

    const deletePlanUrl = `/api/club_providers/id/${clubProviderId}/plans/${planId}`

    try {
        await axios.delete(deletePlanUrl)
    }
    catch (err) {
        console.log(err)
    }
}