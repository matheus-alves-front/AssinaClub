import { RefObject, useContext, useEffect, useRef, useState } from 'react';
import { Oval } from 'react-loader-spinner';
import { Plan } from '../../../../../@types/PlansTypes';
import { AddProdToPlanContext } from '../../../../../contexts/ClubDashboard/AddProdToPlanContext/AddProdToPlanContext';
import { DeletingPlansContext, ClubDashboardUpdateContext, ClubNavigationContext } from '../../../../../contexts/ClubDashboard/ClubDashboardContext';
import { ClubDashboardGlobalContext } from '../../../../../contexts/ClubDashboard/ClubDashboardGlobalContext';
import PlanCard from '../Cards/PlanCard/PlanCard';
import { deletePlanAndUpdate } from '../utils/deletePlan';
import styles from "./styles.module.scss"

type PlansTableProps = {
    plansInfo: Plan[]
}

export function PlansList({
    plansInfo
}: PlansTableProps) {

    const { deletingPlans } = useContext(DeletingPlansContext)

    const { setUpdatePlans } = useContext(ClubDashboardUpdateContext)

    const {
        focusMode,
        setFocusMode
    } = useContext(ClubNavigationContext)

    const {
        setSelectedPlanInAddPlan
    } = useContext(AddProdToPlanContext)

    const [plansXPosition, setPlansXPosition] = useState(0)
    const [plansXMove, setPlansXMove] = useState(0)
    const [maxPlansXMove, setMaxPlansXMove] = useState(0)

    const cardRef = useRef() as RefObject<HTMLDivElement>;
    const [cardRefWidth, setcardRefWidth] = useState<number>(0)

    const cardsWrapperRef = useRef() as RefObject<HTMLDivElement>;
    const [cardsWrapperRefWidth, setcardsWrapperRefWidth] = useState<number>(0)

    const [planBeingDeleted, setPlanBeingDeleted] = useState<Plan | null>(null)

    const { clubProviderInfo } = useContext(ClubDashboardGlobalContext)

    const clubProviderId = String(clubProviderInfo?.id)

    useEffect(() => {
        const resizeObserver = new ResizeObserver(entries => {
            setcardRefWidth(entries[0].contentRect.width);
        });

        if (cardRef.current) resizeObserver.observe(cardRef.current);

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    useEffect(() => {
        const resizeObserver = new ResizeObserver(entries => {
            setcardsWrapperRefWidth(entries[0].contentRect.width);
        });

        if (cardsWrapperRef.current) resizeObserver.observe(cardsWrapperRef.current);

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    function handleMove(direction: string) {

        const maxPlansXMoveUpdated = Math.ceil((((plansInfo.length * (cardRefWidth + 40)) - cardsWrapperRefWidth) / 500))

        setMaxPlansXMove(maxPlansXMoveUpdated)

        if (direction === 'left') {
            if (plansXMove > 0) {
                setPlansXMove(plansXMove - 1)
                setPlansXPosition(plansXPosition + 500)
            }
        }
        else {
            if (plansXMove < maxPlansXMoveUpdated) {
                setPlansXPosition(plansXPosition - 500)
                setPlansXMove(plansXMove + 1)
            }
        }
    }

    return (
        
        <section className={
            (focusMode === 'plans' ? styles.listWrapperFocused : (
                (plansXMove === maxPlansXMove) && (plansXMove !== 0)) ?
                styles.listWrapperEnd : (
                    plansXMove === 0 ? styles.listWrapperBegin : styles.listWrapper
                )
            )
        }>
            {
                (plansXMove !== 0) &&
                <button
                    className={styles.sideButtonLeft}
                    onClick={() => {
                        handleMove('left')
                    }}
                >
                    <div />
                </button>
            }
            {
                (plansXMove !== maxPlansXMove || (plansXMove === 0 && maxPlansXMove === 0)) &&
                <button
                    className={styles.sideButtonRight}
                    onClick={() => {
                        handleMove('right')
                    }}
                >
                    <div />
                </button>
            }
            <div
                className={styles.cardsWrapper}
                ref={cardsWrapperRef}
                style={{ transform: `translate(${plansXPosition}px, 0)` }}
            >
                {plansInfo &&
                    (<>
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
                    </>)
                }
            </div>
        </section>
    )
}