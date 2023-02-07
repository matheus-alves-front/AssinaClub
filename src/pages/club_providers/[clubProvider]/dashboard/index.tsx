import { useEffect, useState } from "react"
import { GetServerSideProps } from "next"
import { getClubProviderByName } from "../../../../prisma/clubProviders"
import { ClubProvider } from "../../../../@types/ClubProviderTypes"
import { Admin } from "../../../../@types/AdminsClubProviderTypes"
import { AdminLoginModal } from "../../../../components/Dashboard/ClubProvider/Admins/AdminLoginModal"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../api/auth/[...nextauth]"
import { GetSessionParams } from "next-auth/react"
import Table from 'react-bootstrap/Table';
import axios from "axios"

type ClubProviderHomeProps = {
    clubProviderAdmins: {
        data: Admin[]
    }
    userData: any //! Corrigir tipagem
}

export default function ClubProvidersHome({ clubProviderAdmins, userData }: ClubProviderHomeProps) {

    const [canDisplayModal, setCanDisplayModal] = useState(false)
    const [adminIsDefined, setAdminIsDefined] = useState(false)
    const [clubProviderInfo, setClubProviderInfo] = useState(null)

    useEffect(() => {
        setCanDisplayModal(true)
        lookForAdmin(userData)
    }, [])

    useEffect(() => {
        if(adminIsDefined) getClubProviderInfo()
    }, [adminIsDefined])

    async function getClubProviderInfo() {
        try {
            const response = await axios.get(`http://localhost:3000/api/club_providers/${userData.id}`) 
            const clubProvider = response.data.data
            setClubProviderInfo(clubProvider)
            const subscriberIds = clubProvider.subscriberIds
            console.log(subscriberIds)
            getSubscribersInfo(subscriberIds)
        } catch (err) {
            console.log(err)
            alert("Algo deu errado!")
        }
    }

    function getSubscribersInfo(subscriberIds: any) {
        
    }

    function lookForAdmin(userData: any) { //! Corrigir tipagem
        if (userData.occupation !== undefined) setCanDisplayModal(false)
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
            {adminIsDefined &&
                <div>
                    <Table responsive="sm">
                        <thead>
                            <tr>
                                <th>Assinantes</th>
                                <th>Table heading</th>
                                <th>Table heading</th>
                                <th>Table heading</th>
                                <th>Table heading</th>
                                <th>Table heading</th>
                                <th>Table heading</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            }
        </>
    )
}

export interface GetClubProviderData extends GetSessionParams {
    userData?: any
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const { userData } = await getServerSession(context.req, context.res, authOptions) as GetClubProviderData

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
