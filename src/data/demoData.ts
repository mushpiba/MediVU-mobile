import type { DemoClinic, DemoPatient, EligibilityProfile, EligibilityRuleSet } from '../domain/types'

export const demoPatient: DemoPatient = {
  id: 'P-042',
  name: '김하늘',
  age: 42,
  sex: '여성',
  residence: '해솔도',
  previousDiagnosis: '알레르기 비염',
  previousVisitDate: '2026-04-18',
}

export const demoClinic: DemoClinic = {
  id: 'haesol-family',
  name: '해솔가정의학과의원',
  specialty: '가정의학과 · 재진 가능',
  distance: '해솔도 내 2.4km',
}

export const eligibilityProfile: EligibilityProfile = {
  identityVerified: true,
  hasVerifiedRevisit: true,
  clinicTelemedicineEnabled: true,
}

export const eligibilityRuleSet: EligibilityRuleSet = {
  name: 'FUTURE POLICY DEMO',
  asOf: '2026-07-22',
}
