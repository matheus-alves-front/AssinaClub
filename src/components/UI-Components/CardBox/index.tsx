import { ReactNode, RefObject } from "react";
import styles from './cardBox.module.scss'

type CardBoxProps = {
  title: string
  children: ReactNode
  cardRef?: RefObject<HTMLDivElement>
  className?: string
}

export function CardBox({title, children, cardRef, className}: CardBoxProps) {
  return (
    <div ref={cardRef ? cardRef : null} className={`${styles.cardBox} ${className ? className : ''}`}>
      <header><strong>{title}</strong></header>
      <div className={styles.cardContent}>
        {children}
      </div>
    </div>
  )
}