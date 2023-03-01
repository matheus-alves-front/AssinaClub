import styles from './styles.module.scss'
import handleSliderMove from '../../../utils/slider/handleSliderMove'
import { SliderArgumentsType, SliderButtonsType } from './@types'

export default function SliderButtons(props: SliderButtonsType) {

    const { movesIterations, maxMovesIterations } = props

    let sliderArguments = [] as any

    for (let [key, value] of Object.entries(props)) {
        if (key === 'maxMovesIterations') continue
        sliderArguments.push(value)
    }

    return (
        <>
            {
                (movesIterations !== 0) &&
                <button
                    className={styles.sideButtonLeft}
                    onClick={() => {
                        handleSliderMove('left', ...(sliderArguments as SliderArgumentsType))
                    }}
                >
                    <div />
                </button>
            }
            {
                (movesIterations !== maxMovesIterations || (movesIterations === 0 && maxMovesIterations === 0)) &&
                <button
                    className={styles.sideButtonRight}
                    onClick={() => {
                        handleSliderMove('right', ...(sliderArguments as SliderArgumentsType))
                    }}
                >
                    <div />
                </button>
            }
        </>
    )
}