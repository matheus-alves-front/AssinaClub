import styles from "./styles.module.scss"

type DarkNavButtonType = {
    children: string,
    handleNavButton: any,
    handleNavParam: string
}

export default function DarkNavButton(props: DarkNavButtonType) {
    return (
        <button
            className={styles.darkButton}
            onClick={() => {
                props.handleNavButton(props.handleNavParam)
            }}
        >
            {props.children}
        </button>
    )
}