import { createContext, useContext, useMemo, useReducer, useState, type PropsWithChildren } from 'react'
import { demoKeywords, demoTranscript } from '../data/demoData'
import type { ConfirmedDiagnosis, DeliveryStage, EligibilityResult, Keyword, PrescriptionOrder, TranscriptEvent } from '../domain/types'

interface DemoEncounterState {
  eligibilityResult: EligibilityResult | null
  appointmentTime: string | null
  appointmentConfirmed: boolean
  transcriptEvents: TranscriptEvent[]
  keywords: Keyword[]
  patientNotes: string[]
  doctorNotes: string[]
  confirmedDiagnosis: ConfirmedDiagnosis | null
  prescription: PrescriptionOrder | null
  orderSaved: boolean
  deliveryStage: DeliveryStage
}

export type DemoEncounterAction =
  | { type: 'set-eligibility'; result: EligibilityResult }
  | { type: 'schedule-appointment'; time: string }
  | { type: 'play-transcript' }
  | { type: 'add-patient-note'; note: string }
  | { type: 'add-doctor-note'; note: string }
  | { type: 'remove-keyword'; keywordId: string }
  | { type: 'save-order'; diagnosis: ConfirmedDiagnosis; prescription: PrescriptionOrder }
  | { type: 'set-delivery-stage'; stage: DeliveryStage }
  | { type: 'reset' }

export const initialDemoEncounterState: DemoEncounterState = {
  eligibilityResult: null,
  appointmentTime: null,
  appointmentConfirmed: false,
  transcriptEvents: [],
  keywords: [],
  patientNotes: [],
  doctorNotes: [],
  confirmedDiagnosis: null,
  prescription: null,
  orderSaved: false,
  deliveryStage: 'eligibility',
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
    case 'save-order':
      return { ...state, confirmedDiagnosis: action.diagnosis, prescription: action.prescription, orderSaved: true }
    case 'set-delivery-stage':
      return { ...state, deliveryStage: action.stage }
    case 'reset':
      return initialDemoEncounterState
  }
}

interface DemoEncounterContextValue {
  state: DemoEncounterState
  statusNotice: string
  setEligibility: (result: EligibilityResult) => void
  scheduleAppointment: (time: string) => void
  playTranscript: () => void
  addPatientNote: (note: string) => void
  addDoctorNote: (note: string) => void
  removeKeyword: (keywordId: string) => void
  saveOrder: (diagnosis: ConfirmedDiagnosis, prescription: PrescriptionOrder) => void
  setDeliveryStage: (stage: DeliveryStage) => void
  resetDemo: () => void
}

const DemoEncounterContext = createContext<DemoEncounterContextValue | null>(null)

export function DemoEncounterProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(demoEncounterReducer, initialDemoEncounterState)
  const [statusNotice, setStatusNotice] = useState('')
  const value = useMemo(
    () => ({
      state,
      statusNotice,
      setEligibility: (result: EligibilityResult) => dispatch({ type: 'set-eligibility', result }),
      scheduleAppointment: (time: string) => dispatch({ type: 'schedule-appointment', time }),
      playTranscript: () => dispatch({ type: 'play-transcript' }),
      addPatientNote: (note: string) => dispatch({ type: 'add-patient-note', note }),
      addDoctorNote: (note: string) => dispatch({ type: 'add-doctor-note', note }),
      removeKeyword: (keywordId: string) => dispatch({ type: 'remove-keyword', keywordId }),
      saveOrder: (diagnosis: ConfirmedDiagnosis, prescription: PrescriptionOrder) => {
        dispatch({ type: 'save-order', diagnosis, prescription })
        setStatusNotice('처방과 오더를 저장했습니다.')
      },
      setDeliveryStage: (stage: DeliveryStage) => dispatch({ type: 'set-delivery-stage', stage }),
      resetDemo: () => {
        dispatch({ type: 'reset' })
        setStatusNotice('데모가 초기화되었습니다.')
      },
    }),
    [statusNotice, state],
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
