import { ReactNode, RefObject } from "react";
import styles from './cardBox.module.scss'

type CardBoxProps = {
  title: string
  children: ReactNode
  cardRef?: RefObject<HTMLDivElement>
}

export function CardBox({title, children, cardRef}: CardBoxProps) {
  return (
    <div ref={cardRef ? cardRef : null} className={styles.cardBox}>
      <header><strong>{title}</strong></header>
      <div className={styles.cardContent}>
        {children}
      </div>
    </div>
  )
}