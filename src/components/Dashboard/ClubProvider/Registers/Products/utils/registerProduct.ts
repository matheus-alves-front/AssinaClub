import { FormEvent, SetStateAction } from "react";
import axios from "axios";

type inputsType = {
    inputName: string,
    inputDescription: string,
    inputSKU: string,
    inputValue: string
}

export async function registerProduct(
    event: FormEvent<HTMLFormElement>,
    clubProviderId: string | string[] | undefined,
    setUpdateProducts: (value: SetStateAction<boolean>) => void,
    inputs: inputsType
) {
    event.preventDefault()

    const { inputName, inputDescription, inputSKU, inputValue } = inputs

    if (!inputName || !inputDescription || !inputSKU || !inputValue) {
        return alert('Campo Faltando')
    }

    const data = {
        "name": inputName,
        "description": inputDescription,
        "sku": inputSKU,
        "value": Number(inputValue)
    }

    try {
        const response = await axios.post(`/api/club_providers/id/${clubProviderId}/products`, data)
        if (response.status === 201) {
            setUpdateProducts(true)
        }

    } catch (err) {
        console.error(err)
    }
}