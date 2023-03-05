import { Editor, useEditor } from "@tiptap/react";
import { createContext, useContext, useEffect, useState } from "react";
import PageBuilder from "../../components/PageBuilder";
import { EditorConfiguration } from "../../components/PageBuilder/Menu";

type PagebuilderContextProps = {
  HTMLArray: string[]
  setHTMLContent: (html: string) => void
  BuilderStep: number
  setBuilderStep: (step: number) => void
  editorOutput: Editor | null
}

export const PagebuilderContext = createContext({} as PagebuilderContextProps)

export default function PagebuilderPage() {
  const editorOutput = useEditor(EditorConfiguration)

  const [HTMLArray, setHTMLArray] = useState<string[]>([])

  const [BuilderStep, changeBuilderStep] = useState(1)

  function setBuilderStep(step: number) {
    changeBuilderStep(step)
  }

  function setHTMLContent(html: string) {
    setHTMLArray([...HTMLArray, html.replace(',','')])
  }

  return (
    <PagebuilderContext.Provider value={{
      HTMLArray,
      setHTMLContent,
      BuilderStep,
      setBuilderStep,
      editorOutput
    }}>
      <PageBuilder />
    </PagebuilderContext.Provider>
  )
}