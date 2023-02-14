import axios from 'axios';
import { SetStateAction } from 'react';
import { ClubProvider } from '../../@types/ClubProviderTypes';
import { Product } from '../../@types/ProductTypes';

async function getProductsInfo(clubProviderId: string) {
    const productsUrl = `${process.env.BASE_URL}/api/club_providers/id/${clubProviderId}/products`
    const response = await axios.get(productsUrl)
    return response.data.data
}

type handleProductsInfoProps = {
    setProductsInfo: (value: SetStateAction<Product[]>) => void
    clubProviderInfo: ClubProvider | null   
}

export async function handleProductsInfo({
    setProductsInfo,
    clubProviderInfo
}: handleProductsInfoProps) {
    if (clubProviderInfo) setProductsInfo(await getProductsInfo(String(clubProviderInfo.id)))
}