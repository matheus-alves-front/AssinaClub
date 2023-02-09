import axios from 'axios';

async function getProductsInfo(clubProviderId: string) {
    const productsUrl = `http://localhost:3000/api/club_providers/id/${clubProviderId}/products`
    const response = await axios.get(productsUrl)
    return response.data.data
}

export async function handleProductsInfo( //! Corrigir Tipagem
    setProductsInfo: any,
    clubProviderInfo: any
) {
    if (clubProviderInfo) setProductsInfo(await getProductsInfo(clubProviderInfo.id))
}