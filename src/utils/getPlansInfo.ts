import axios from 'axios';

export async function getPlansInfo(clubProviderId: string) { 
    const plansUrl = `http://localhost:3000/api/club_providers/id/${clubProviderId}/plans`
    const response = await axios.get(plansUrl)
    return response.data.data
}