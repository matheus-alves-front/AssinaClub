import axios from 'axios';

export async function getProductsInfo(clubProviderId: string) { 
    const productsUrl = `http://localhost:3000/api/club_providers/id/${clubProviderId}/products`
    const response = await axios.get(productsUrl)
    return response.data.data
}