import { useEffect, useState } from "react"
import { GetServerSideProps } from "next"
import { getClubProviderByName } from "../../../../prisma/clubProviders"
import { ClubProvider } from "../../../../@types/ClubProviderTypes"
import { Admin } from "../../../../@types/AdminsClubProviderTypes"
import { AdminLoginModal } from "../../../../components/Dashboard/ClubProvider/Admins/AdminLoginModal"
import { getServerSession } from "next-auth"
import { GetSubscriberData } from "../../../register/admin"
import { authOptions } from "../../../api/auth/[...nextauth]"
import { GetSessionParams } from "next-auth/react"

type ClubProviderHomeProps = {
    clubProviderAdmins: {
        data: Admin[]
    }
    userData: any //! Corrigir tipagem
}

export default function ClubProvidersHome({ clubProviderAdmins, userData }: ClubProviderHomeProps) {

    const [canDisplayModal, setCamDisplayModal] = useState(false)
    const [adminIsDefined, setAdminIsDefined] = useState(false)

    useEffect(() => {
        setCamDisplayModal(true)
        lookForAdmin(userData)
    }, [])

    function lookForAdmin(userData: any) { //! Corrigir tipagem
        if(userData.occupation !== undefined) setCamDisplayModal(false)
    }

    return (
        <>
            {canDisplayModal &&
                <AdminLoginModal
                    adminIsDefined={adminIsDefined}
                    setAdminIsDefined={setAdminIsDefined}
                    clubProviderAdmins={clubProviderAdmins}

                />
            }
        </>
    )
}

export interface GetClubProviderData extends GetSessionParams {
    userData?: ClubProvider
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const session = await getServerSession(context.req, context.res, authOptions) as GetClubProviderData 

    const { userData } = session

    // console.log(userData)
    
    const { host } = context.req.headers
    const clubProviderName = String(context?.params?.clubProvider)

    const clubProvider = await getClubProviderByName(clubProviderName)

    const fetchClubProviderAdmins = await fetch(`http://${host}/api/club_providers/id/${clubProvider?.id}/admins/`)

    const clubProviderAdmins = await fetchClubProviderAdmins.json()

    return {
        props: {
            clubProviderAdmins,
            userData
        }
    }
}
