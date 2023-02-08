import axios from "axios"

export async function deletePlanAndUpdate(
    planId: string | string[],
    clubProviderId: string,
    setPlanBeingDeleted: any, //! Corrigir Tipagem
    setUpdatePlans: any
) {

    const deletePlanUrl = `http://localhost:3000/api/club_providers/id/${clubProviderId}/plans/${planId}`

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

    const deletePlanUrl = `http://localhost:3000/api/club_providers/id/${clubProviderId}/plans/${planId}`

    try {
        await axios.delete(deletePlanUrl)
    }
    catch (err) {
        console.log(err)
    }
}