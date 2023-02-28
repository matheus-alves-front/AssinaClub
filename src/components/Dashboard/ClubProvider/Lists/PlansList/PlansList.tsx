import { RefObject, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Oval } from 'react-loader-spinner';
import { Plan } from '../../../../../@types/PlansTypes';
import { DeletingPlansContext, ClubDashboardUpdateContext } from '../../../../../contexts/ClubDashboard/ClubDashboardContext';
import { ClubDashboardGlobalContext } from '../../../../../contexts/ClubDashboard/ClubDashboardGlobalContext';
import { deletePlanAndDontUpdate, deletePlanAndUpdate } from '../utils/deletePlan';
import styles from "./styles.module.scss"

type PlansTableProps = {
    plansInfo: Plan[]
}

export function PlansList({
    plansInfo
}: PlansTableProps) {

    const { clubProviderInfo } = useContext(ClubDashboardGlobalContext)

    const { deletingPlans } = useContext(DeletingPlansContext)

    const { setUpdatePlans } = useContext(ClubDashboardUpdateContext)

    const [planBeingDeleted, setPlanBeingDeleted] = useState<Plan | null>(null)

    const [plansXPosition, setPlansXPosition] = useState(0)
    const [plansXMove, setPlansXMove] = useState(0)
    const [maxPlansXMove, setMaxPlansXMove] = useState(0)

    const clubProviderId = String(clubProviderInfo?.id)

    const cardRef = useRef() as RefObject<HTMLDivElement>;
    const [cardRefWidth, setcardRefWidth] = useState<number>(0)

    const cardsWrapperRef = useRef() as RefObject<HTMLDivElement>;
    const [cardsWrapperRefWidth, setcardsWrapperRefWidth] = useState<number>(0)

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
            ((plansXMove === maxPlansXMove) && (plansXMove !== 0)) ?
                styles.listWrapperEnd : (
                    plansXMove === 0 ? styles.listWrapperBegin : styles.listWrapper
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
                                className={styles.planCard}
                                ref={cardRef}
                                key={index}
                            >
                                <img src='#' alt='' />
                                <p>{plan.title}</p>
                                <p>Descrição: {plan.description}</p>
                                <p>nº de Assinantes: {plan.subscriberIds.length}</p>
                                <p>{"R$ " + plan.price.toFixed(2)}</p>
                                <p>Frequência: {plan.deliveryFrequency}</p>
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