import { EditorContent, useEditor } from '@tiptap/react'
import { useContext } from 'react'
import { EditorConfiguration, PagebuilderMenu } from '../../components/PageBuilder/Menu'
import { PagebuilderContext } from '../../pages/subscriber/pagebuilder'

import styles from './pageBuilder.module.scss'

export default function PageBuilder() {
  const {
    HTMLArray,
    setHTMLContent,
    editorOutput
  } = useContext(PagebuilderContext)



  return (
    <section className={styles.pageBuilderPage}>
      <div className={styles.builderManager}>
        <PagebuilderMenu />
      </div>
      <EditorContent accessKey='output' className={styles.outputPageBuilder} editor={editorOutput} />
    </section>
  )
}