import axios from "axios"
import { getSubscribersInfo } from "./getSubscribersInfo"

export async function getClubProviderInfo( //! Corrigir tipagem
    userData: any,
    setClubProviderInfo: any,
    setSubscribersInfo: any
) {
    try {
        const response = await axios.get(`http://localhost:3000/api/club_providers/${userData.id}`)
        const clubProvider = response.data.data
        setClubProviderInfo(clubProvider)
        getSubscribersInfo(clubProvider.id, setSubscribersInfo)
    } catch (err) {
        console.log(err)
        alert("Algo deu errado!")
    }
}