import { ReactNode } from "react"

import styles from './toastContent.module.scss'

type ModalContentProps = {
  title: string
  children: ReactNode
}

export function Toast({
  title,
  children
}: ModalContentProps) {
  return (
    <section className={styles.toastContainer}>
      <header><h4>{title}</h4></header>
      <div className={styles.toastChildren}>{children}</div>
    </section>
  )
}