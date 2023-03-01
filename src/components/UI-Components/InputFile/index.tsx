import { ReactNode } from 'react'
import { IoAdd } from 'react-icons/io5'
import styles from './inputFile.module.scss'

type InputFileProps = {
  children: ReactNode
}

export function InputFile({children}: InputFileProps) {
  return (
    <label className={styles.inputFile}>
      {children}
      <div className={styles.addPicture}>
        <IoAdd />
        Adicionar Foto
      </div>
    </label>
  )
}