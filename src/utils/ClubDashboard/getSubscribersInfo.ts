import axios from "axios"

export async function getSubscribersInfo( //! Corrigir tipagem
    clubProviderId: string | string[],
    setSubscribersInfo: any
) { 
    const response = await axios.get(`http://localhost:3000/api/subscribers?clubProviderId=${clubProviderId}`)
    const subscribers = response.data.data
    setSubscribersInfo(subscribers)
}
