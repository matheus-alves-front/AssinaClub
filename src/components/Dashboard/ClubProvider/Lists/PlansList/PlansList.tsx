import { RefObject, useContext, useEffect, useRef, useState } from 'react';
import { Oval } from 'react-loader-spinner';
import { Plan } from '../../../../../@types/PlansTypes';
import { AddProdToPlanContext } from '../../../../../contexts/ClubDashboard/AddProdToPlanContext/AddProdToPlanContext';
import { DeletingPlansContext, ClubDashboardUpdateContext, ClubNavigationContext } from '../../../../../contexts/ClubDashboard/ClubDashboardContext';
import { ClubDashboardGlobalContext } from '../../../../../contexts/ClubDashboard/ClubDashboardGlobalContext';
import PlanCard from '../Cards/PlanCard/PlanCard';
import { deletePlanAndUpdate } from './utils/deletePlan';
import observeRefsWidth from '../../../../UI-Components/Slider/utils/observeRefsWidth';
import Slider from '../../../../UI-Components/Slider';
import styles from "../styles.module.scss"

type PlansTableProps = {
    plansInfo: Plan[]
}

export function PlansList({
    plansInfo
}: PlansTableProps) {

    const { deletingPlans } = useContext(DeletingPlansContext)
    const { setUpdatePlans } = useContext(ClubDashboardUpdateContext)
    const { focusMode, setFocusMode } = useContext(ClubNavigationContext)
    const { setSelectedPlanInAddPlan } = useContext(AddProdToPlanContext)
    const { clubProviderInfo } = useContext(ClubDashboardGlobalContext)

    const cardRef = useRef() as RefObject<HTMLDivElement>;

    const [cardRefWidth, setcardRefWidth] = useState<number>(0)
    const [planBeingDeleted, setPlanBeingDeleted] = useState<Plan | null>(null)

    const clubProviderId = String(clubProviderInfo?.id)

    useEffect(() => {
        observeRefsWidth(cardRef, setcardRefWidth)
    }, []);

    return (
        <Slider
            sliderClassName={focusMode === 'plans' ? styles.sliderFocused : ''}
            infoList={plansInfo}
            cardRefWidth={cardRefWidth}
        >
            {plansInfo &&
                <>
                    {plansInfo.map((plan, index) => (
                        <div
                            onClick={() => {
                                if (focusMode === 'plans') {
                                    setSelectedPlanInAddPlan(plan)
                                    setFocusMode(null)
                                }
                            }}
                            ref={cardRef}
                            key={index}
                        >
                            <PlanCard plan={plan} />
                            {
                                deletingPlans &&
                                <button
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
                                </button>
                            }
                        </div>
                    ))}
                </>
            }
        </Slider>
    )
}