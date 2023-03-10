import { createContext, SetStateAction } from "react";
import { Admin } from "../../@types/AdminsClubProviderTypes";

export type AdminDashboardContextType = {
    adminsToShow: Admin[],
    setAdminsToShow: (value: SetStateAction<Admin[]>) => void,
    editAdminMode: boolean,
    setEditAdminMode: (value: SetStateAction<boolean>) => void,
    isFirstRender: boolean,
    setIsFirstRender: (value: SetStateAction<boolean>) => void,
    adminsCardUpperText: string, 
    setAdminsCardUpperText: (value: SetStateAction<string>) => void,
    changingadminsCardUpperText: boolean,
    setChangingadminsCardUpperText: (value: SetStateAction<boolean>) => void,
    currentAdmin: Admin,
    setCurrentAdmin: (value: SetStateAction<Admin>) => void,
    clubProviderAdmins: {
        data: Admin[]
    }
    editMyProfileMode: boolean,
    setEditMyProfileMode: (value: SetStateAction<boolean>) => void,
    myProfileCardUpperText: string, 
    changingmyProfileCardUpperText: boolean,
}

export const AdminDashboardContext = createContext({} as AdminDashboardContextType)