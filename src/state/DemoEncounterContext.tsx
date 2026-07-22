import { createContext, useContext, useMemo, useReducer, useState, type PropsWithChildren } from 'react'
import type { EligibilityResult } from '../domain/types'

interface DemoEncounterState {
  eligibilityResult: EligibilityResult | null
}

type DemoEncounterAction =
  | { type: 'set-eligibility'; result: EligibilityResult }
  | { type: 'reset' }

export const initialDemoEncounterState: DemoEncounterState = {
  eligibilityResult: null,
}

export function demoEncounterReducer(state: DemoEncounterState, action: DemoEncounterAction): DemoEncounterState {
  switch (action.type) {
    case 'set-eligibility':
      return { ...state, eligibilityResult: action.result }
    case 'reset':
      return initialDemoEncounterState
  }
}

interface DemoEncounterContextValue {
  state: DemoEncounterState
  resetNotice: string
  setEligibility: (result: EligibilityResult) => void
  resetDemo: () => void
}

const DemoEncounterContext = createContext<DemoEncounterContextValue | null>(null)

export function DemoEncounterProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(demoEncounterReducer, initialDemoEncounterState)
  const [resetNotice, setResetNotice] = useState('')
  const value = useMemo(
    () => ({
      state,
      resetNotice,
      setEligibility: (result: EligibilityResult) => dispatch({ type: 'set-eligibility', result }),
      resetDemo: () => {
        dispatch({ type: 'reset' })
        setResetNotice('데모가 초기화되었습니다.')
      },
    }),
    [resetNotice, state],
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
