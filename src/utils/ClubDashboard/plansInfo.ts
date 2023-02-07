import axios from 'axios';

async function getPlansInfo(clubProviderId: string) {
    const plansUrl = `http://localhost:3000/api/club_providers/id/${clubProviderId}/plans`
    const response = await axios.get(plansUrl)
    return response.data.data
}

export async function handlePlansInfo( //! Corrigir Tipagem
    subscribersInfo: any,
    setPlansInfo: any,
    clubProviderInfo: any
) { 
    if (subscribersInfo) setPlansInfo(await getPlansInfo(clubProviderInfo?.id))
}