import { createContext, useContext, useMemo, useReducer, useState, type PropsWithChildren } from 'react'
import { demoKeywords, demoTranscript } from '../data/demoData'
import type { EligibilityResult, Keyword, TranscriptEvent } from '../domain/types'

interface DemoEncounterState {
  eligibilityResult: EligibilityResult | null
  appointmentTime: string | null
  appointmentConfirmed: boolean
  transcriptEvents: TranscriptEvent[]
  keywords: Keyword[]
  patientNotes: string[]
  doctorNotes: string[]
}

export type DemoEncounterAction =
  | { type: 'set-eligibility'; result: EligibilityResult }
  | { type: 'schedule-appointment'; time: string }
  | { type: 'play-transcript' }
  | { type: 'add-patient-note'; note: string }
  | { type: 'add-doctor-note'; note: string }
  | { type: 'remove-keyword'; keywordId: string }
  | { type: 'reset' }

export const initialDemoEncounterState: DemoEncounterState = {
  eligibilityResult: null,
  appointmentTime: null,
  appointmentConfirmed: false,
  transcriptEvents: [],
  keywords: [],
  patientNotes: [],
  doctorNotes: [],
}

export function demoEncounterReducer(state: DemoEncounterState, action: DemoEncounterAction): DemoEncounterState {
  switch (action.type) {
    case 'set-eligibility':
      return { ...state, eligibilityResult: action.result }
    case 'schedule-appointment':
      return { ...state, appointmentTime: action.time, appointmentConfirmed: true }
    case 'play-transcript':
      return { ...state, transcriptEvents: demoTranscript, keywords: demoKeywords }
    case 'add-patient-note': {
      const note = action.note.trim()
      return note ? { ...state, patientNotes: [...state.patientNotes, note] } : state
    }
    case 'add-doctor-note': {
      const note = action.note.trim()
      return note ? { ...state, doctorNotes: [...state.doctorNotes, note] } : state
    }
    case 'remove-keyword':
      return { ...state, keywords: state.keywords.filter(({ id }) => id !== action.keywordId) }
    case 'reset':
      return initialDemoEncounterState
  }
}

interface DemoEncounterContextValue {
  state: DemoEncounterState
  resetNotice: string
  setEligibility: (result: EligibilityResult) => void
  scheduleAppointment: (time: string) => void
  playTranscript: () => void
  addPatientNote: (note: string) => void
  addDoctorNote: (note: string) => void
  removeKeyword: (keywordId: string) => void
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
      scheduleAppointment: (time: string) => dispatch({ type: 'schedule-appointment', time }),
      playTranscript: () => dispatch({ type: 'play-transcript' }),
      addPatientNote: (note: string) => dispatch({ type: 'add-patient-note', note }),
      addDoctorNote: (note: string) => dispatch({ type: 'add-doctor-note', note }),
      removeKeyword: (keywordId: string) => dispatch({ type: 'remove-keyword', keywordId }),
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
