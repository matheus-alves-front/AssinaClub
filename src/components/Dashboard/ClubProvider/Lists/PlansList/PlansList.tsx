import { RefObject, useContext, useEffect, useRef, useState } from 'react';
import { Oval } from 'react-loader-spinner';
import { Plan } from '../../../../../@types/PlansTypes';
import { AddProdToPlanContext } from '../../../../../contexts/ClubDashboard/AddProdToPlanContext/AddProdToPlanContext';
import { DeletingPlansContext, ClubDashboardUpdateContext, ClubNavigationContext } from '../../../../../contexts/ClubDashboard/ClubDashboardContext';
import { ClubDashboardGlobalContext } from '../../../../../contexts/ClubDashboard/ClubDashboardGlobalContext';
import PlanCard from '../Cards/PlanCard/PlanCard';
import { deletePlanAndUpdate } from './utils/deletePlan';
import observeRefsWidth from '../../../../UI-Components/Slider/utils/observeRefsWidth';
import styles from "./styles.module.scss"
import Slider from '../../../../UI-Components/Slider';

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

    //* Variables used in the slider
    const [cardsWrapperPosition, setCardsWrapperPosition] = useState(0)
    const [movesIterations, setMovesIterations] = useState(0)
    const [maxMovesIterations, setMaxMovesIterations] = useState(0)

    const cardRef = useRef() as RefObject<HTMLDivElement>;
    const [cardRefWidth, setcardRefWidth] = useState<number>(0)

    const cardsWrapperRef = useRef() as RefObject<HTMLDivElement>;
    const [cardsWrapperRefWidth, setcardsWrapperRefWidth] = useState<number>(0)

    const [planBeingDeleted, setPlanBeingDeleted] = useState<Plan | null>(null)

    const { clubProviderInfo } = useContext(ClubDashboardGlobalContext)

    const clubProviderId = String(clubProviderInfo?.id)

    useEffect(() => {
        observeRefsWidth(cardRef, setcardRefWidth)
        observeRefsWidth(cardsWrapperRef, setcardsWrapperRefWidth)
    }, []);

    return (

        <section className={
            (focusMode === 'plans' ? styles.listWrapperFocused : (
                (movesIterations === maxMovesIterations) && (movesIterations !== 0)) ?
                styles.listWrapperEnd : (
                    movesIterations === 0 ? styles.listWrapperBegin : styles.listWrapper
                )
            )
        }>
            <Slider
                sliderClassName={styles.cardsWrapper}
                wrapperRef={cardsWrapperRef}
                infoList={plansInfo}
                cardRefWidth={cardRefWidth}
                cardsWrapperRefWidth={cardsWrapperRefWidth}
                cardsWrapperPosition={cardsWrapperPosition}
                movesIterations={movesIterations}
                maxMovesIterations={maxMovesIterations}
                setMovesIterations={setMovesIterations}
                setMaxMovesIterations={setMaxMovesIterations}
                setCardsWrapperPosition={setCardsWrapperPosition}
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
                                className={styles.planCard}
                                ref={cardRef}
                                key={index}
                            >
                                <PlanCard
                                    plan={plan}
                                />
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
        </section>
    )
}