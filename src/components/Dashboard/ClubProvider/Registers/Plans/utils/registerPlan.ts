import { FormEvent, SetStateAction } from "react";
import axios from "axios";

type inputsType = {
    inputName: string,
    inputDescription: string,
    inputPrice: string,
    inputFrequency: string
}

export async function registerPlan(
    event: FormEvent<HTMLFormElement>,
    clubProviderId: string | string[] | undefined,
    setUpdatePlans: (value: SetStateAction<boolean>) => void,
    inputs: inputsType
) {
    event.preventDefault()

    const form = event.target as HTMLFormElement;

    const { inputName, inputDescription, inputPrice, inputFrequency } = inputs

    if (!inputName || !inputDescription || !inputPrice || !inputFrequency) {
        return alert("Campos Faltando")
    }

    const data = {
        "title": inputName,
        "description": inputDescription,
        "price": Number(inputPrice),
        "deliveryFrequency": Number(inputFrequency)
    }

    try {
        const response = await axios.post(`/api/club_providers/id/${clubProviderId}/plans`, data)

        if (response.status === 201) {
            setUpdatePlans(true)
        }
    } catch (err) {
        console.log(err)
    }

    form.reset()
}