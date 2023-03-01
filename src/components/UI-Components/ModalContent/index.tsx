import { ReactNode } from "react"

import styles from './modalContent.module.scss'

type ModalContentProps = {
  title: string
  children: ReactNode
}

export function ModalContent({
  title,
  children
}: ModalContentProps) {
  return (
    <section className={styles.modalContent}>
      <header><h4>{title}</h4></header>
      <div className={styles.modalChildren}>{children}</div>
    </section>
  )
}