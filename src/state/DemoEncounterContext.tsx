import { createContext, useContext, useMemo, useState, type PropsWithChildren } from 'react'

interface DemoEncounterContextValue {
  resetNotice: string
  resetDemo: () => void
}

const DemoEncounterContext = createContext<DemoEncounterContextValue | null>(null)

export function DemoEncounterProvider({ children }: PropsWithChildren) {
  const [resetNotice, setResetNotice] = useState('')
  const value = useMemo(
    () => ({
      resetNotice,
      resetDemo: () => setResetNotice('데모가 초기화되었습니다.'),
    }),
    [resetNotice],
  )

  return <DemoEncounterContext.Provider value={value}>{children}</DemoEncounterContext.Provider>
}

export function useDemoEncounter() {
  const context = useContext(DemoEncounterContext)
  if (!context) {
    throw new Error('useDemoEncounter must be used within DemoEncounterProvider')
  }
  return context
}

