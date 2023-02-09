import { FormEvent } from "react";
import axios from "axios";

export async function RegisterProduct(event: FormEvent<HTMLFormElement>, clubProviderId: string | string[] | undefined) {
    event.preventDefault()

    const form = event.target as HTMLFormElement;

    const { productName, productDescription, productSku, productValue } = form

    if (!productName.value || !productDescription.value || !productSku.value || !productValue.value) {
        return alert('Campo Faltando')
    }

    const data = {
        "name": productName.value,
        "description": productDescription.value,
        "sku": productSku.value,
        "value": Number(productValue.value)
    }

    try {
        await axios.post(`/api/club_providers/id/${clubProviderId}/products`, data)
    } catch (err) {
        console.log(err)
    }

    form.reset()
}