import { useEditor, EditorContent,  } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Color from '@tiptap/extension-color'
import {TextStyle} from '@tiptap/extension-text-style'

import { useContext, useEffect, useState } from 'react'
import { PagebuilderContext } from '../../../pages/subscriber/pagebuilder'

import styles from './menu.module.scss'


export const EditorConfiguration = {
  extensions: [
    StarterKit,
    TextAlign.configure({
      types: ['heading', 'paragraph']
    }),
    Color,
    TextStyle
  ],
  editorProps: {
    attributes: {
      class: styles.pageBuilder,
    },
  },
  content: '',
}


export function PagebuilderMenu() {
  const editor = useEditor(EditorConfiguration)
  const [colorText, setColorText] = useState('#000000')
  const [colorTextSelected, setColorTextSelected] = useState([colorText])

  useEffect(() => {
    editor?.commands.selectAll()
    editor?.chain().focus().setColor(colorText).run()
  }, [colorText])

  const {
    HTMLArray,
    setHTMLContent,
    editorOutput
  } = useContext(PagebuilderContext)

  return (
    <div className={styles.pageBuilderMenu}>
      <h1>Editor</h1>
      {editor && 
        <nav>
          <h5>Tipo:</h5>
          <button
            onClick={() => {
              editor.chain().focus().setHeading({ level: 1 }).run()
            }}
          >
            Título
          </button>
          <button
            onClick={() => {
              editor.chain().focus().setHeading({ level: 3 }).run()
              
            }}
          >
            Sub Título
          </button>
          <button
            onClick={() => {
              editor.chain().focus().setParagraph().run()
            }}
          >
            Páragrafo
          </button>
          <h5>Alinhamento:</h5>
          <button
            onClick={() => {
              editor.chain().focus()
              editor.commands.setTextAlign('left')
            }}
          >
            Esquerda
          </button>
          <button
            onClick={() => {
              editor.chain().focus()
              editor.commands.setTextAlign('center')
            }}
          >
            Centro
          </button>
          <button
            onClick={() => {
              editor.chain().focus()
              editor.commands.setTextAlign('right')
            }}
          >
            Direita
          </button>
          <h5>Cor:</h5>
          <input 
            type="color" 
            defaultValue={colorText}
            onChange={e => setColorText(e.target.value)}
          />
          {colorTextSelected.map((color, index) => (
              <button 
                className={styles.color}
                key={index}
                onClick={() => {
                  editor?.commands.selectAll()
                  editor?.chain().focus().setColor(color).run()
                  setColorText(color)
                  editor?.commands.selectTextblockEnd()
                }}
                style={{background: color, border: '1px solid #FFF', borderRadius: 10}}
              >
              </button>
          ))}

          <button
            onClick={() => {
              editor?.commands.selectAll()
              editor?.chain().focus().setColor(colorText).run()
              setColorTextSelected([...colorTextSelected, colorText])
            }}
          >
            Adicionar
          </button>
        </nav>
      }

      <EditorContent className={styles.pageBuilderContent} editor={editor} />
      
      <button
        onClick={() => {
          console.log(editor?.getJSON())
          editorOutput?.commands.insertContent(String(editor?.getHTML()))
        }}
      >
        Salvar
      </button>
    </div>
  )
}