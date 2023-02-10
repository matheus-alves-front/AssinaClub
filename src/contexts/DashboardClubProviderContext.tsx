import { createContext, useState } from "react";

import { ClubProvider } from "../@types/ClubProviderTypes";
import { Plan } from "../@types/PlansTypes";
import { Product } from "../@types/ProductTypes";
import { Subscriber } from "../@types/SubscriberTypes";


type DashboardClubProviderContextType = {
  deletePlans: (plansInfo: Plan[]) => void
  deletingPlans: boolean
  plansThatCanBeDeleted: Plan[]
}

export const DashboardClubProviderContext = createContext({} as DashboardClubProviderContextType)

export function DashboardContextClubProvider({children}: any) {
  const [clubProviderInfo, setClubProviderInfo] = useState<ClubProvider | null>(null)
  const [subscribersInfo, setSubscribersInfo] = useState<Subscriber[] | null>(null)

  const [updateProducts, setUpdateProducts] = useState(false)
  const [updatePlans, setUpdatePlans] = useState(false)

  const [deletingPlans, setDeletingPlans] = useState(false)

  const [plansInfo, setPlansInfo] = useState<Plan[]>([])
  const [productsInfo, setProductsInfo] = useState<Product[]>([])

  const [plansThatCanBeDeleted, setPlansThatCanBeDeleted] = useState<Plan[]>([])


  function deletePlans(plansInfo: Plan[]) {
    const filteredPlans = [...plansInfo].filter(plan => plan.subscriberIds.length === 0)
    setPlansThatCanBeDeleted(filteredPlans)
    setDeletingPlans(true)
  }

  return (
    <DashboardClubProviderContext.Provider value={{
      deletePlans,
      deletingPlans,
      plansThatCanBeDeleted
    }}>
      {children}
    </DashboardClubProviderContext.Provider>
  )
}