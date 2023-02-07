import { useEffect, useState } from "react"
import { GetServerSideProps } from "next"
import { getClubProviderByName } from "../../../../prisma/clubProviders"
import { ClubProvider } from "../../../../@types/ClubProviderTypes"
import { Admin } from "../../../../@types/AdminsClubProviderTypes"
import { AdminLoginModal } from "../../../../components/Dashboard/ClubProvider/Admins/AdminLoginModal"

type ClubProviderHomeProps = {
    clubProviderAdmins: {
        data: Admin[]
    }
}

export default function ClubProvidersHome({ clubProviderAdmins }: ClubProviderHomeProps) {

    const [canDisplayModal, setCamDisplayModal] = useState(false)
    const [adminIsDefined, setAdminIsDefined] = useState(false)

    useEffect(() => {
        setCamDisplayModal(true)
    }, [])

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


export const getServerSideProps: GetServerSideProps = async (context) => {
    const { host } = context.req.headers
    const clubProviderName = String(context?.params?.clubProvider)

    const clubProvider = await getClubProviderByName(clubProviderName)

    const fetchClubProviderAdmins = await fetch(`http://${host}/api/club_providers/id/${clubProvider?.id}/admins/`)

    const clubProviderAdmins = await fetchClubProviderAdmins.json()

    return {
        props: {
            clubProviderAdmins
        }
    }
}
