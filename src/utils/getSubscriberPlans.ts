export function getSubscriberPlansFormatted(subscriberPlanIds: any, plansInfo: any[]) { //! Corrigir tipagem
    const filteredPlans = [...plansInfo].filter(plan => subscriberPlanIds.includes(plan.id))
    const reducedPlans = filteredPlans.map(plan => {
        return {
            title: plan.title, 
            price: plan.price, 
        }
    })
    return reducedPlans[0].title
}

export function getSubscriberPlans(subscriberPlanIds: any, plansInfo: any[]) { //! Corrigir tipagem
    return [...plansInfo].filter(plan => subscriberPlanIds.includes(plan.id))
}