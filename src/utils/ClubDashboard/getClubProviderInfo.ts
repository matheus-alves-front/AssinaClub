import axios from "axios"
import { SetStateAction } from "react";
import { Admin } from "../../@types/AdminsClubProviderTypes"
import { ClubProvider } from "../../@types/ClubProviderTypes"
import { Subscriber } from "../../@types/SubscriberTypes";
import { getSubscribersInfo } from "./getSubscribersInfo"

export async function getClubProviderInfo(
    userData: ClubProvider | Admin,
    setClubProviderInfo: (value: SetStateAction<ClubProvider | null>) => void,
    setSubscribersInfo: (value: SetStateAction<Subscriber[]>) => void,
    typeOfUser: string
) {
    const admin = userData as Admin;
    const clubProvider = userData as ClubProvider;

    const clubProviderUrlParam = typeOfUser === "admin" ? admin.clubProviderId : clubProvider.id

    try {
        const response = await axios.get(`http://localhost:3000/api/club_providers/${clubProviderUrlParam}`)
        const clubProvider = response.data.data
        setClubProviderInfo(clubProvider)
        getSubscribersInfo(clubProvider.id, setSubscribersInfo)
    } catch (err) {
        console.log(err)
        alert("Algo deu errado!")
    }
}