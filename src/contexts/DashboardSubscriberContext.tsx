import { createContext, useState } from "react";

type DashboardSubscriberContextType = {
  section: string
  changeSection: (section: string) => void
}

export const DashboardSubscriberContext = createContext({} as DashboardSubscriberContextType)

export function DashboardContextProvider({children}: any) {
  const [section, setSection] = useState('dashboard')

  function changeSection(section: string) {
    setSection(section)
  }

  return (
    <DashboardSubscriberContext.Provider value={{
      section,
      changeSection
    }}>
      {children}
    </DashboardSubscriberContext.Provider>
  )
}