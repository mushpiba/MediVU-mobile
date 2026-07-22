export type EligibilityStatus = 'eligible' | 'ineligible'
export type DemoRole = 'patient' | 'doctor'
export type KeywordSource = 'ambient' | 'history' | 'patient' | 'doctor'

export interface TranscriptEvent {
  id: string
  speaker: 'patient' | 'doctor'
  speakerLabel: string
  text: string
  time: string
}

export interface Keyword {
  id: string
  label: string
  source: KeywordSource
}

export interface DiagnosisCandidate {
  id: string
  name: string
  code: string
  baseScore: number
  keywordWeights: Record<string, number>
}

export interface ScoredDiagnosis extends DiagnosisCandidate {
  score: number
  matchedKeywords: string[]
}

export type MedicationRestriction = 'allowed' | 'conditional' | 'prohibited'
export type DeliveryStage = 'eligibility' | 'pharmacy' | 'address' | 'preparing' | 'shipping' | 'delivered'

export interface MedicationDecision {
  medicationId: string
  name: string
  status: MedicationRestriction
  reason: string
  source: string
  asOf: string
  evidenceUrl: string
}

export interface MedicationRuleSet {
  source: string
  asOf: string
  evidenceUrl: string
  medications: Record<string, Omit<MedicationDecision, 'source' | 'asOf' | 'evidenceUrl'>>
}

export interface ConfirmedDiagnosis {
  id: string
  name: string
  code: string
}

export interface PrescriptionOrder {
  medicationId: string
  name: string
  strength: string
  instructions: string
}

export interface EligibilityProfile {
  identityVerified: boolean
  hasVerifiedRevisit: boolean
  clinicTelemedicineEnabled: boolean
}

export interface EligibilityAnswers {
  sameSymptoms: boolean
}

export interface EligibilityRuleSet {
  name: string
  asOf: string
}

export interface EligibilityCheck {
  id: 'identity' | 'revisit' | 'same-symptoms' | 'clinic'
  label: string
  passed: boolean
}

export interface EligibilityResult {
  status: EligibilityStatus
  summary: string
  checks: EligibilityCheck[]
  ruleSetName: string
  ruleSetAsOf: string
}

export interface DemoPatient {
  id: string
  name: string
  age: number
  sex: string
  residence: string
  previousDiagnosis: string
  previousVisitDate: string
}

export interface DemoClinic {
  id: string
  name: string
  specialty: string
  distance: string
}
