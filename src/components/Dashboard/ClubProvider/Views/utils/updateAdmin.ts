import axios from "axios";
import { FormEvent, SetStateAction } from "react";
import { Admin } from "../../../../../@types/AdminsClubProviderTypes";

export async function updateAdmin(
    event: FormEvent<HTMLFormElement>,
    clubProviderId: string,
    adminToUpdate: Admin,
    setAdminsToShow: (value: SetStateAction<Admin[]>) => void
) {
    event.preventDefault()

    const {
        firstNameAdmin, lastNameAdmin,
        occupationAdmin, birthDateAdmin,
        emailAdmin
    } = event.target as HTMLFormElement;

    const data = {} as any //! Corrigir tipagem

    if (firstNameAdmin.value) data.name = `${firstNameAdmin.value} ${lastNameAdmin.value} `
    if (occupationAdmin.value) data.occupation = occupationAdmin.value
    if (birthDateAdmin.value) data.birthDate = birthDateAdmin.value
    if (emailAdmin.value) data.email = emailAdmin.value

    try {
        const response = await axios.put(`/api/club_providers/id/${clubProviderId}/admins/${adminToUpdate.id}`, data)        

        if(response.status === 200) {
            const updatedAdmins = await axios.get(`/api/club_providers/id/${clubProviderId}/admins`)            
            setAdminsToShow(updatedAdmins.data.data);            
            return response.status
        }

        return response.status
    }
    catch (err: any) {
        console.log(err.response.data.message)
        return err.response.status
    }
}