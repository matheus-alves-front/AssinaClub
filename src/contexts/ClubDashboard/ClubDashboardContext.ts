import { createContext } from "react";

import {
    ClubAdminContextType,
    ClubDashboardUpdateContextType,
    ClubNavigationContextType,
    DeletingPlansContextType,
    InfoContextType
} from "../../@types/ClubDashboardContextTypes";


export const DeletingPlansContext = createContext({} as DeletingPlansContextType)

export const ClubNavigationContext = createContext({} as ClubNavigationContextType)

export const ClubAdminContext = createContext({} as ClubAdminContextType)

export const InfoContext = createContext({} as InfoContextType)

export const ClubDashboardUpdateContext = createContext({} as ClubDashboardUpdateContextType)