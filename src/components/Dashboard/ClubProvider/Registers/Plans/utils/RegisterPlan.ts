import { FormEvent } from "react";
import axios from "axios";

export async function RegisterPlan(event: FormEvent<HTMLFormElement>, clubProviderId: string | string[] | undefined) {
    event.preventDefault()

    const form = event.target as HTMLFormElement;

    const { planTitle, planDescription, planPrice, planFrequency } = form

    if (!planTitle.value || !planDescription.value || !planPrice.value || !planFrequency.value) {
        return alert("Campos Faltando")
    }

    const data = {
        "title": planTitle.value,
        "description": planDescription.value,
        "price": Number(planPrice.value),
        "deliveryFrequency": Number(planFrequency.value)
    }

    try {
        await axios.post(`/api/club_providers/id/${clubProviderId}/plans`, data)
    } catch (err) {
        console.log(err)
    }

    form.reset()
}