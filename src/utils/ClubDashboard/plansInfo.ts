import axios from 'axios';
import { SetStateAction } from 'react';
import { ClubProvider } from '../../@types/ClubProviderTypes';
import { Plan } from '../../@types/PlansTypes';
import { Subscriber } from '../../@types/SubscriberTypes';

async function getPlansInfo(clubProviderId: string) {
    const plansUrl = `${process.env.BASE_URL}/api/club_providers/id/${clubProviderId}/plans`
    const response = await axios.get(plansUrl)
    return response.data.data
}

export async function handlePlansInfo( 
    subscribersInfo: Subscriber[],
    setPlansInfo: (value: SetStateAction<Plan[]>) => void,
    clubProviderInfo: ClubProvider,
    setPlansThatCanBeDeleted: (value: SetStateAction<Plan[]>) => void,
) {
    if (!!subscribersInfo) {
        const updatedPlans = await getPlansInfo(clubProviderInfo?.id)
        const filteredPlans = [...updatedPlans].filter(plan => plan.subscriberIds.length === 0)
        setPlansInfo(updatedPlans)
        setPlansThatCanBeDeleted(filteredPlans)
    }
}