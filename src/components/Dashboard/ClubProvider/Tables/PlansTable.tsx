import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { Oval } from 'react-loader-spinner';
import { deletePlanAndDontUpdate, deletePlanAndUpdate } from './utils/deletePlan';
import { PLANS_PROPERTIES } from './utils/myClubProperties';

export function PlansTable({
    plansInfo,
    deletingPlans,
    clubProviderInfo,
    setUpdatePlans
}: any) { //! Corrigir tipagem

    const [planBeingDeleted, setPlanBeingDeleted] = useState<any>(null) //! Corrigir tipagem

    return (
        <section>
            <div className={deletingPlans ? "d-flex justify-content-center" : ""}>
                <Table bordered hover responsive="sm" >
                    <thead>
                        <tr>
                            {PLANS_PROPERTIES.map((property, i) => <th key={i}>{property}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {plansInfo ?
                            (<>
                                {plansInfo.map((plan: any, index: number) => ( //! Corrigir tipagem
                                    <>
                                        <tr key={index}>
                                            <td>{++index}</td>
                                            <td>{plan.title}</td>
                                            <td>{plan.description}</td>
                                            <td>{plan.subscriberIds.length}</td>
                                            <td>{"R$ " + plan.price.toFixed(2)}</td>
                                            <td>{plan.deliveryFrequency}</td>
                                        </tr>
                                    </>
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
                            {plansInfo.map((plan: any, index: number) => ( //! Corrigir tipagem
                                <section key={index}>
                                    <Button
                                        onClick={() => {
                                            setPlanBeingDeleted(plan)
                                            deletePlanAndUpdate(
                                                plan?.id,
                                                clubProviderInfo?.id,
                                                setPlanBeingDeleted,
                                                setUpdatePlans
                                            )
                                        }}
                                        disabled={planBeingDeleted}
                                        className='d-flex justify-content-center align-items-center'
                                        variant=
                                        {
                                            planBeingDeleted?.title === plan.title ?
                                                "danger" :
                                                "outline-danger"
                                        }
                                        style={{ width: "15px", height: "30px", marginBottom: "11px" }}
                                    >
                                        {planBeingDeleted?.title === plan.title ?
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
                            plansInfo.forEach(plan => { //! Corrigir tipagem
                                deletePlanAndDontUpdate(
                                    plan?.id,
                                    clubProviderInfo?.id,
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