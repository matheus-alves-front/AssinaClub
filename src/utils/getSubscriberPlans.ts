import { Plan } from "../@types/PlansTypes"

export function getSubscriberPlansFormatted(subscriberPlanIds: string[], plansInfo: Plan[]) {
    const filteredPlans = [...plansInfo].filter(plan => subscriberPlanIds.includes(String(plan.id)))
    const reducedPlans = filteredPlans.map(plan => {
        return {
            title: plan.title, 
            price: plan.price, 
        }
    })
    return reducedPlans[0].title
}

export function getSubscriberPlans(subscriberPlanIds: string[], plansInfo: Plan[]) {
    return [...plansInfo].filter(plan => subscriberPlanIds.includes(String(plan.id)))
}