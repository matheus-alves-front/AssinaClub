import { SetStateAction } from "react";
import { Admin } from "../@types/AdminsClubProviderTypes";
import { ClubProvider } from "../@types/ClubProviderTypes";
import { Plan } from "../@types/PlansTypes";
import { Product } from "../@types/ProductTypes";
import { Subscriber } from "../@types/SubscriberTypes";

export type DeletingPlansContextType = {
    deletePlans: (plansInfo: Plan[]) => void
    deletingPlans: boolean
    setDeletingPlans: (value: SetStateAction<boolean>) => void
    plansThatCanBeDeleted: Plan[]
    setPlansThatCanBeDeleted: (value: SetStateAction<Plan[]>) => void
}

export type ClubNavigationContextType = {
    myNavScreenSelected: string
    setMyNavScreenSelected: (value: SetStateAction<string>) => void
    clubRegNavScreenSelected: string
    setClubRegNavScreenSelected: (value: SetStateAction<string>) => void
}

export type ClubAdminContextType = {
    adminIsDefined: boolean
    setAdminIsDefined: (value: SetStateAction<boolean>) => void
    clubProviderAdmins: {
        data: Admin[]
    }
}

export type InfoContextType = {
    subscribersInfo: Subscriber[]
    setSubscribersInfo: (value: SetStateAction<Subscriber[]>) => void
    plansInfo: Plan[]
    setPlansInfo: (value: SetStateAction<Plan[]>) => void
    productsInfo: Product[]
    setProductsInfo: (value: SetStateAction<Product[]>) => void
}

export type ClubDashboardUpdateContextType = {
    setUpdateProducts: (value: SetStateAction<boolean>) => void
    setUpdatePlans: (value: SetStateAction<boolean>) => void
}