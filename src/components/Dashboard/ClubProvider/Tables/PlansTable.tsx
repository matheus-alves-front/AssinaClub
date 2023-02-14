import { useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { Oval } from 'react-loader-spinner';
import { Plan } from '../../../../@types/PlansTypes';
import { DeletingPlansContext, ClubDashboardUpdateContext } from '../../../../contexts/ClubDashboard/ClubDashboardContext';
import { ClubDashboardGlobalContext } from '../../../../contexts/ClubDashboard/ClubDashboardGlobalContext';
import { deletePlanAndDontUpdate, deletePlanAndUpdate } from './utils/deletePlan';
import { PLANS_PROPERTIES } from './utils/myClubProperties';

type PlansTableProps = {
    plansInfo: Plan[]
}

export function PlansTable({
    plansInfo
}: PlansTableProps) {

    const {
        clubProviderInfo
    } = useContext(ClubDashboardGlobalContext)
    
    const {
        deletingPlans,
    } = useContext(DeletingPlansContext)

    const {
        setUpdatePlans
    } = useContext(ClubDashboardUpdateContext)

    const [planBeingDeleted, setPlanBeingDeleted] = useState<Plan | null>(null)
    const clubProviderId = String(clubProviderInfo?.id)

    return (
        <section>
            <div className={deletingPlans ? "d-flex justify-content-center" : ""}>
                <Table bordered hover responsive="sm">
                    <thead>
                        <tr>
                            {PLANS_PROPERTIES.map((property, i) => <th key={i}>{property}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {plansInfo ?
                            (<>
                                {plansInfo.map((plan, index) => (
                                        <tr key={index}>
                                            <td>{++index}</td>
                                            <td>{plan.title}</td>
                                            <td>{plan.description}</td>
                                            <td>{plan.subscriberIds.length}</td>
                                            <td>{"R$ " + plan.price.toFixed(2)}</td>
                                            <td>{plan.deliveryFrequency}</td>
                                        </tr>
                                ))}
                            </>)
                            :
                            <></>
                        }
                    </tbody>
                </Table>
                {plansInfo && deletingPlans ?
                    (
                        <div style={{ marginTop: "45px", marginLeft: "20px" }}>
                            {plansInfo.map((plan, index) => (
                                <section key={index}>
                                    <Button
                                        onClick={() => {
                                            setPlanBeingDeleted(plan)
                                            deletePlanAndUpdate(
                                                plan?.id,
                                                clubProviderId,
                                                setPlanBeingDeleted,
                                                setUpdatePlans
                                            )
                                        }}
                                        disabled={!!planBeingDeleted}
                                        className='d-flex justify-content-center align-items-center'
                                        variant=
                                        {
                                            planBeingDeleted?.id === plan.id ?
                                                "danger" :
                                                "outline-danger"
                                        }
                                        style={{ width: "15px", height: "30px", marginBottom: "11px" }}
                                    >
                                        {planBeingDeleted?.id === plan.id ?
                                            <Oval
                                                width={18}
                                                color="#FFFFFF"
                                                secondaryColor="gray"
                                                visible={true}
                                                ariaLabel='oval-loading'
                                                strokeWidth={3}
                                                strokeWidthSecondary={4}

                                            /> : "X"}
                                    </Button>
                                </section>
                            ))}
                        </div>
                    )
                    :
                    <></>
                }
            </div>
            {
                plansInfo && deletingPlans &&
                <div className='text-center' style={{ marginTop: "20px" }}>
                    <Button
                        variant="danger"
                        onClick={() => {
                            plansInfo.forEach(plan => {
                                deletePlanAndDontUpdate(
                                    plan?.id,
                                    clubProviderId,
                                )
                            })
                            setTimeout(() => {
                                setUpdatePlans(true)
                            }, 500)
                        }}
                    >
                        Deletar todos
                    </Button>
                </div>
            }
        </section>
    )
}