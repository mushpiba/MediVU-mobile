export type EligibilityStatus = 'eligible' | 'ineligible'

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
