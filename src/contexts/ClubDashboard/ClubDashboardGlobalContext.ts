import { createContext, SetStateAction } from "react";

import { ClubProvider } from "../../@types/ClubProviderTypes";

export type ClubDashboardGlobalContextType = {
    clubProviderInfo: ClubProvider | null
    setClubProviderInfo: (value: SetStateAction<ClubProvider | null>) => void
    showOnlyAdminsInDashboard: boolean, 
    setShowOnlyAdminsInDashboard: (value: SetStateAction<boolean>) => void
}

export const ClubDashboardGlobalContext = createContext({} as ClubDashboardGlobalContextType)