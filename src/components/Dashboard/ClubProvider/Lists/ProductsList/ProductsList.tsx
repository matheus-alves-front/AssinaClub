import { RefObject, useContext, useEffect, useRef, useState } from 'react';
import { InfoContext } from '../../../../../contexts/ClubDashboard/ClubDashboardContext';
import styles from "./styles.module.scss"

export function ProductsList() {

    const {
        plansInfo,
        productsInfo
    } = useContext(InfoContext)

    const [plansXPosition, setPlansXPosition] = useState(0)
    const [plansXMove, setPlansXMove] = useState(0)
    const [maxPlansXMove, setMaxPlansXMove] = useState(0)

    const cardRef = useRef() as RefObject<HTMLDivElement>;
    const [cardRefWidth, setcardRefWidth] = useState<number>(0)

    const cardsWrapperRef = useRef() as RefObject<HTMLDivElement>;
    const [cardsWrapperRefWidth, setcardsWrapperRefWidth] = useState<number>(0)

    useEffect(() => {
        const resizeObserver = new ResizeObserver(entries => {
            setcardsWrapperRefWidth(entries[0].contentRect.width);
        });

        if (cardsWrapperRef.current) resizeObserver.observe(cardsWrapperRef.current);

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    useEffect(() => {
        const resizeObserver = new ResizeObserver(entries => {
            setcardRefWidth(entries[0].contentRect.width);
        });

        if (cardRef.current) resizeObserver.observe(cardRef.current);

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    function handleMove(direction: string) {

        const maxPlansXMoveUpdated = Math.ceil((((productsInfo.length * (cardRefWidth + 40)) - cardsWrapperRefWidth) / 500))

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
            {
                productsInfo &&
                (
                    <div
                        className={styles.cardsWrapper}
                        ref={cardsWrapperRef}
                        style={{ transform: `translate(${plansXPosition}px, 0)` }}
                    >
                        {productsInfo.map((product, index) => (
                            <div
                                key={index}
                                className={styles.prodCard}
                                ref={cardRef}
                            >
                                <img src='' alt='' />
                                <p>{product.name}</p>
                                <p>{product.description}</p>
                                <p>{"R$ " + product.value.toFixed(2)}</p>
                                <p>{product.sku}</p>
                                <p>Nenhuma</p>
                                <p>Nenhum</p>
                            </div>
                        ))}
                    </div>
                )
            }
        </section>
    )
}