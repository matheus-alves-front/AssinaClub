import styles from "./styles.module.scss"

export function DivisionLine() {
    return (
        <div className={styles.divisionLine} />
    );
}

export function DivisionLineWithoutMargin() {
    return (
        <div
            className="bg-secondary-subtle"
            style={{
                height: '3px',
            }} />
    );
}
