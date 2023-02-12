import axios from "axios"
import { SetStateAction } from "react"
import { Subscriber } from "../../@types/SubscriberTypes"

export async function getSubscribersInfo(
    clubProviderId: string | string[],
    setSubscribersInfo: (value: SetStateAction<Subscriber[]>) => void
) { 
    const response = await axios.get(`http://localhost:3000/api/subscribers?clubProviderId=${clubProviderId}`)
    const subscribers = response.data.data
    setSubscribersInfo(subscribers)
}
